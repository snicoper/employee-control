export type SidenavMenuItem = { name: string; open: boolean };

export type SidenavMenu = Array<SidenavMenuItem>;

export const SidenavMenus: SidenavMenu = [
  { name: 'administration', open: false },
  { name: 'enterprise', open: false },
  { name: 'calendar', open: false },
  { name: 'employee', open: false }
];
