import { Roles } from '../../core/types/_index';
import { SiteUrls } from '../../core/urls/_index';
import { SidebarMenu, SidebarMenuTypes } from './sidebar-menu-types.model';

export const sidebarMenu: SidebarMenu[] = [
  {
    title: 'Administración',
    icon: 'fas fa-user-shield',
    active: false,
    type: SidebarMenuTypes.dropdown,
    requiredRole: Roles.siteAdmin,
    submenus: [
      {
        title: 'Panel',
        link: SiteUrls.dashboard.dashboard,
        icon: 'fas fa-user-shield',
        active: false
      },
      {
        title: 'Tests',
        link: SiteUrls.tests.homeTests,
        active: false
      }
    ]
  },
  {
    title: 'Empresa',
    icon: 'fa-regular fa-building',
    active: false,
    type: SidebarMenuTypes.dropdown,
    submenus: [
      {
        title: 'Configuración',
        link: SiteUrls.companySettings.details,
        active: false,
        requiredRole: Roles.enterpriseStaff
      },
      {
        title: 'Empleados',
        link: SiteUrls.employees.list,
        active: false
      },
      {
        title: 'Departamentos',
        link: SiteUrls.departments.list,
        active: false
      },
      {
        title: 'Tareas',
        link: SiteUrls.companyTasks.list,
        active: false
      },
      {
        title: 'Ausencias',
        link: SiteUrls.categoryAbsences.list,
        active: false,
        requiredRole: Roles.enterpriseStaff
      },
      {
        title: 'Registro de tiempos',
        link: SiteUrls.timeControlRecords.home,
        active: false,
        requiredRole: Roles.enterpriseStaff
      }
    ]
  },
  {
    title: 'Empleado',
    icon: 'fa-solid fa-user',
    active: false,
    type: SidebarMenuTypes.dropdown,
    submenus: [
      {
        title: 'Configuración',
        link: SiteUrls.employees.settings,
        active: false
      },
      {
        title: 'Control de tiempo',
        link: SiteUrls.timesControl.home,
        active: false
      }
    ]
  },
  {
    title: 'Desconectar',
    icon: 'fa-solid fa-right-from-bracket',
    active: false,
    type: SidebarMenuTypes.simple,
    link: SiteUrls.auth.logout
  }
];
