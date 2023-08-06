<script setup lang="ts">
import { ref } from 'vue';
import { MenuItem } from '@/mock/data';
import { MenuItemType } from '@/interface/menu';
import DropdownMenu from '@/components/DropdownMenu.vue';
import DropdownSelector from '@/components/DropdownSelector.vue';

const menuItems = ref(MenuItem);

const handleSelectItem = (selectedItem: MenuItemType) => {
  expandItemAndAncestors(menuItems.value, selectedItem.id);
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

const handleClearLocalStorage = () => {
  localStorage.clear();
  window.location.reload();
};
</script>

<template>
  <main>
    <DropdownMenu :menuItems="menuItems" />
    <div class="flex">
      <DropdownSelector :menuItems="menuItems" @selectItem="handleSelectItem" />
      <button
        @click="handleClearLocalStorage"
        class="mt-4 ml-2 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear Local Storage
      </button>
    </div>
  </main>
</template>
