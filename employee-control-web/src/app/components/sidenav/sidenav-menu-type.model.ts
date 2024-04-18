import { Role } from '../../core/types/role';

export enum SidenavMenuType {
  header = 'header',
  dropdown = 'dropdown',
  simple = 'simple'
}

export type SidenavMenu = {
  title: string;
  icon: string;
  active: boolean;
  type: SidenavMenuType;
  router?: string;
  requiredRole: Role;

  badge?: {
    text: string;
    class: string;
  };

  submenus?: Array<SidenavSubMenu>;
};

export type SidenavSubMenu = {
  title: string;
  router: string;
  active: boolean;
  icon?: string;
  requiredRole: Role;

  badge?: {
    text: string;
    class: string;
  };
};
