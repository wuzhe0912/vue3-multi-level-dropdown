<script setup lang="ts">
import { ref } from 'vue';
import { MenuItem } from './mock/data';
import { MenuItemType } from './interface/menu';
import DropdownMenu from './components/DropdownMenu.vue';
import DropdownSelector from './components/DropdownSelector.vue';

const menuItems = ref(MenuItem);

const handleSelectItem = (selectedId: string) => {
  expandItemAndAncestors(menuItems.value, selectedId);
};

const expandItemAndAncestors = (items: MenuItemType[], id: string): boolean => {
  for (const item of items) {
    if (item.id === id || expandItemAndAncestors(item.children || [], id)) {
      item.expanded = true;
      return true;
    } else {
      item.expanded = false;
    }
  }
  return false;
};
</script>

<template>
  <main>
    <DropdownMenu :menuItems="menuItems" />
    <DropdownSelector :menuItems="menuItems" @selectItem="handleSelectItem" />
  </main>
</template>
