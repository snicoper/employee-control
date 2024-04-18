import { Role } from '../../core/types/role';
import { SiteUrl } from '../../core/urls/site-urls';
import { SidenavMenu, SidenavMenuType } from './sidenav-menu-type.model';

export const sidenavMenu: Array<SidenavMenu> = [
  {
    title: 'Administración',
    icon: 'shield_person',
    active: false,
    type: SidenavMenuType.dropdown,
    requiredRole: Role.Admin,
    submenus: [
      {
        title: 'Panel',
        router: SiteUrl.dashboard.dashboard,
        icon: '',
        active: false,
        requiredRole: Role.Admin
      }
    ]
  },
  {
    title: 'Empresa',
    icon: 'apartment',
    active: false,
    type: SidenavMenuType.dropdown,
    requiredRole: Role.HumanResources,
    submenus: [
      {
        title: 'Configuración',
        router: SiteUrl.companySettings.details,
        active: false,
        requiredRole: Role.Staff
      },
      {
        title: 'Empleados',
        router: SiteUrl.employees.list,
        active: false,
        requiredRole: Role.HumanResources
      },
      {
        title: 'Departamentos',
        router: SiteUrl.departments.list,
        active: false,
        requiredRole: Role.HumanResources
      },
      {
        title: 'Tareas',
        router: SiteUrl.companyTasks.list,
        active: false,
        requiredRole: Role.HumanResources
      },
      {
        title: 'Ausencias',
        router: SiteUrl.categoryAbsences.list,
        active: false,
        requiredRole: Role.HumanResources
      },
      {
        title: 'Registro de tiempos',
        router: SiteUrl.timeControlRecords.list,
        active: false,
        requiredRole: Role.HumanResources
      },
      {
        title: 'Días festivos',
        router: SiteUrl.companyHolidaysManage.manage,
        active: false,
        requiredRole: Role.HumanResources
      }
    ]
  },
  {
    title: 'Empleado',
    icon: 'person_apron',
    active: false,
    type: SidenavMenuType.dropdown,
    requiredRole: Role.Employee,
    submenus: [
      {
        title: 'Configuración',
        router: SiteUrl.employees.settings,
        active: false,
        requiredRole: Role.Employee
      },
      {
        title: 'Control de tiempo',
        router: SiteUrl.timesControlProgress.list,
        active: false,
        requiredRole: Role.Employee
      }
    ]
  },
  {
    title: 'Desconectar',
    icon: 'logout',
    active: false,
    type: SidenavMenuType.simple,
    requiredRole: Role.Employee,
    router: SiteUrl.auth.logout
  }
];
