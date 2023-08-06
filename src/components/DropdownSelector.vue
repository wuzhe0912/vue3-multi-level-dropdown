<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { MenuItemType } from '../interface/menu';
import { useLocalStorage } from '../composables/useLocalStorage';

const props = defineProps<{
  menuItems: MenuItemType[];
}>();

const emit = defineEmits(['selectItem']);
const { storage } = useLocalStorage('selectedItem', '');
const flattenedItems = ref<MenuItemType[]>([]);

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

const selectItem = (event: Event) => {
  const selectElement = event.target as HTMLSelectElement;
  const selectedItem = flattenedItems.value.find(
    (item) => item.id === selectElement.value
  );
  if (selectedItem) {
    emit('selectItem', selectedItem);
    storage.value = selectElement.value;
  }
};

onMounted(() => {
  flattenItems(props.menuItems);

  const lastSelectedItemId = storage.value;

  if (lastSelectedItemId) {
    const lastSelectedItem = flattenedItems.value.find(
      (item) => item.id === lastSelectedItemId
    );
    if (lastSelectedItem) {
      emit('selectItem', lastSelectedItem);
    }
  }
});
</script>

<template>
  <select
    class="mt-4 ml-2 w-72 h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-md"
    @change="selectItem"
  >
    <option v-for="item in flattenedItems" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>