export interface MenuItem {
  label: string;
  level: number;
  children?: MenuItem[];
}