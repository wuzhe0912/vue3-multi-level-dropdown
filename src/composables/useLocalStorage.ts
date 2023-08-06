import { ref, watch } from 'vue';

export function useLocalStorage(key: string, initialValue: string) {
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  const storage = ref(initial);

  storage.value = JSON.parse(
    localStorage.getItem(key) || JSON.stringify(initialValue)
  );
  watch(
    () => storage.value,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  );

  return { storage };
}
