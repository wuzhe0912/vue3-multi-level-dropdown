<script setup lang="ts">
import { ref, watch } from 'vue';
import { MenuItemType } from '@/interface/menu';
import DropdownMenu from './DropdownMenu.vue';
import RightArrow from '@/assets/right-arrow.svg';
import DownArrow from '@/assets/down-arrow.svg';
import { useLocalStorage } from '@/composables/useLocalStorage';

const props = defineProps<{
  menuItems: MenuItemType[];
}>();
// 使用自定義 hook 從 localStorage 中取得之前選擇的項目
const { storage } = useLocalStorage('selectedItem', '');
const expandedItem = ref<string | null>(storage.value || null);
// const itemsMap = ref(new Map<string, MenuItemType>());

// 使用遞迴函數來展開選定的項目和其所有父項目
const expandItemAndAncestors = (items: MenuItemType[], id: string): boolean => {
  // 這邊使用 for...of 而不是 forEach，是因為 for...of 可以使用 return 中斷迴圈
  for (const item of items) {
    // 如果當前項目 ID 與指定 ID 相匹配，或者其子項目中有匹配的項目，則將其展開
    if (item.id === id || expandItemAndAncestors(item.children || [], id)) {
      item.expanded = true;
      return true;
    } else {
      item.expanded = false;
    }
  }
  return false;
};

// 使用 Map 來儲存所有項目，以便於在點擊項目時能夠快速找到對應的項目
// const populateItemsMap = (items: MenuItemType[]) => {
//   for (const item of items) {
//     itemsMap.value.set(item.id, item);
//     if (item.children) {
//       populateItemsMap(item.children);
//     }
//   }
// }

// const item = itemsMap.value.get(itemID);

// 處理點擊項目時的邏輯
const toggle = (item: MenuItemType) => {
  props.menuItems.forEach((i) => {
    // 如果項目ID與點擊的項目ID匹配，則切換其展開狀態
    if (i.id === item.id) {
      i.expanded = !i.expanded;
      expandedItem.value = i.expanded ? i.id : null;
      storage.value = expandedItem.value; // 儲存到localStorage
    } else {
      i.expanded = false; // 其他項目則設定為收縮狀態
    }

    if (i.children && !i.expanded) {
      collapseChildren(i); // 如果項目有子項目，且為收縮狀態，則收縮所有子項目
    }
  });
};

// 遞迴函數用於收縮所有子項目
const collapseChildren = (item: MenuItemType) => {
  item.children?.forEach((child) => {
    child.expanded = false;
    if (child.children) {
      collapseChildren(child);
    }
  });
};

// 監視 menuItems 的變化，並調整項目的展開狀態
watch(
  () => props.menuItems,
  () => {
    if (expandedItem.value) {
      expandItemAndAncestors(props.menuItems, expandedItem.value);
    } else {
      props.menuItems.forEach((i) => {
        if (i.expanded && i.id !== expandedItem.value) {
          i.expanded = false;
          if (i.children) {
            collapseChildren(i);
          }
        }
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <ul class="space-y-1 bg-gray-100 p-2 rounded-lg w-full">
    <li
      v-for="item in menuItems"
      :key="item.id"
      @click.stop="toggle(item)"
      class="cursor-pointer min-w-full"
    >
      <div :class="[item.expanded ? 'text-blue-800' : '']">
        <template v-if="item.children">
          <img
            v-if="!item.expanded"
            :src="RightArrow"
            alt="Right arrow"
            class="inline-block h-4 w-4 mr-2"
          />
          <img
            v-else
            :src="DownArrow"
            alt="Down arrow"
            class="inline-block h-4 w-4 mr-2"
          />
        </template>
        <span>{{ item.name }}</span>
      </div>
      <transition
        enter-active-class="transition-all duration-300"
        leave-active-class="transition-all duration-300"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="item.children && item.expanded" class="pl-4 transform">
          <DropdownMenu :menuItems="item.children" />
        </div>
      </transition>
    </li>
  </ul>
</template>
