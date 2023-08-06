<script setup lang="ts">
import { ref, watch } from 'vue';
import { MenuItemType } from '../interface/menu';
import DropdownMenu from './DropdownMenu.vue';
import RightArrow from '../assets/right-arrow.svg';
import DownArrow from '../assets/down-arrow.svg';

const props = defineProps<{
  menuItems: MenuItemType[];
}>();

const expandedItem = ref<string | null>(null);

const toggle = (item: MenuItemType) => {
  props.menuItems.forEach((i) => {
    if (i.id === item.id) {
      i.expanded = !i.expanded;
      expandedItem.value = i.expanded ? i.id : null;
    } else {
      i.expanded = false;
    }

    if (i.children && !i.expanded) {
      collapseChildren(i);
    }
  });
};

const collapseChildren = (item: MenuItemType) => {
  item.children?.forEach((child) => {
    child.expanded = false;
    if (child.children) {
      collapseChildren(child);
    }
  });
};

watch(
  () => props.menuItems,
  () => {
    props.menuItems.forEach((i) => {
      if (i.expanded && i.id !== expandedItem.value) {
        i.expanded = false;
        if (i.children) {
          collapseChildren(i);
        }
      }
    });
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
