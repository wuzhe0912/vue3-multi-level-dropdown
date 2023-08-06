<script setup lang="ts">
import { ref } from 'vue';
import { MenuItemType } from '../interface/menu';
import DropdownMenu from './DropdownMenu.vue';

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
</script>

<template>
  <ul class="space-y-1 bg-gray-100 p-2 rounded-lg w-full">
    <li
      v-for="item in menuItems"
      :key="item.id"
      @click.stop="toggle(item)"
      class="cursor-pointer min-w-full"
    >
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
