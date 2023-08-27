<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MenuItemType } from '@/interface/menu';
import { useLocalStorage } from '@/composables/useLocalStorage';

const props = defineProps<{
  menuItems: MenuItemType[];
}>();

const emit = defineEmits(['selectItem']);
const { storage } = useLocalStorage('selectedItem', '');
const flattenedItems = ref<MenuItemType[]>([]);
const selectedItem = ref<string>('');

// 透過遞迴函數將所有項目展開為一維陣列
const flattenItems = (items: MenuItemType[], prefix: string = '') => {
  items.forEach((item) => {
    const prefixedName = prefix ? `${prefix} > ${item.name}` : item.name;
    flattenedItems.value.push({
      ...item,
      name: prefixedName,
    });
    if (item.children) {
      flattenItems(item.children, prefixedName);
    }
  });
};

// 處理選項被選擇的邏輯
const selectItem = (itemID: string) => {
  const selectedItemValue = flattenedItems.value.find(
    (item) => item.id === itemID
  );
  // 如果選擇的項目存在，則發出 selectItem 事件，並將選擇的項目儲存到 localStorage
  if (selectedItemValue) {
    emit('selectItem', selectedItemValue);
    storage.value = itemID;
  }
};

onMounted(() => {
  // 初始化，將所有項目展開為一維陣列
  flattenItems(props.menuItems);

  // 如果 localStorage 中有儲存上次選擇的項目，則將其設定為選擇的項目
  const lastSelectedItemId = storage.value;

  if (lastSelectedItemId) {
    selectedItem.value = lastSelectedItemId;
    const lastSelectedItem = flattenedItems.value.find(
      (item) => item.id === lastSelectedItemId
    );
    if (lastSelectedItem) {
      emit('selectItem', lastSelectedItem);
    }
  } else if (flattenedItems.value.length > 0) {
    // 如果 localStorage 中沒有儲存上次選擇的項目，則將第一個項目設定為選擇的項目
    selectedItem.value = flattenedItems.value[0].id;
  }
});
</script>

<template>
  <select
    v-model="selectedItem"
    class="mt-4 ml-2 w-72 h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-md"
    @change="selectItem(selectedItem)"
  >
    <!-- 循環遍歷每個扁平化的選單項目，產生選單 -->
    <option v-for="item in flattenedItems" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>
