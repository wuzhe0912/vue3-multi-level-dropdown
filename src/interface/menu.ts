export interface MenuItemType {
  id: string;
  name: string;
  expanded?: boolean;
  children?: MenuItemType[];
}
