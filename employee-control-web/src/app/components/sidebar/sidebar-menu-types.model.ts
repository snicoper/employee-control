import { Roles } from '@aw/core/types/roles';

export enum SidebarMenuTypes {
  header = 'header',
  simple = 'simple',
  dropdown = 'dropdown'
}

export type SidebarMenu = {
  title: string;
  icon: string;
  active: boolean;
  type: SidebarMenuTypes;
  link?: string;
  requiredRole?: Roles;

  badge?: {
    text: string;
    class: string;
  };

  submenus?: Array<{
    title: string;
    link: string;
    active: boolean;
    icon?: string;
    requiredRole?: Roles;

    badge?: {
      text: string;
      class: string;
    };
  }>;
};
