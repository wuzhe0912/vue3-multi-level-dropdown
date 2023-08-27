# Multi Level Dropdown Menu

> A simple multi level dropdown menu with vue3, for Neutec company test demo.

## Live Host

[Deploy Host](https://vue3-multi-level-dropdown.vercel.app/)

## Questions

### 元件設計中，請考量在支援最多一百層的結構下，如何合理規劃，試說明之

1. `DropdownMenu.vue` 中使用遞迴組件結構，只要增加資料來源層級，就可以自動延展子選單。
2. 超過三層以上，使用體驗會下滑，可能會採用搜索功能或是 breadcrumb 來解決。
3. `flattenItems` 雖然有將嵌套的陣列轉成一維陣列，但是在遞迴組件中，還是會有重複的運算，如果資料量大的話，可能會有效能問題。可能考慮要將扁平化的陣列儲存，但具體要如何實作，還需要再思考。
4. 如果採用 Map 方式來改寫，這樣在查找特定 ID 時會更為快速(O(1) 的操作)，但可能需要拔掉 watch 的寫法(或許嘗試改為 computed)。

### 實作記憶功能，關閉分頁後再開啟，可以顯示上次選取的項目

- 使用 localStorage 來記錄上次選取的項目。
- 如果資料量大的話，可以考慮使用 IndexedDB 來改寫。

## Technology used

- Vue 3.2.25
- Vite 2.9.15
- TypeScript
- TailwindCSS
