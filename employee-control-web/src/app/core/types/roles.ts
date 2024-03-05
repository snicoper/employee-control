/** Roles del sitio. */
export enum Roles {
  siteAdmin = 'SiteAdmin',
  siteStaff = 'SiteStaff',
  enterpriseAdmin = 'EnterpriseAdmin',
  enterpriseStaff = 'EnterpriseStaff',
  humanResources = 'HumanResources',
  employee = 'Employee',
  anonymous = 'anonymous'
}

/** Obtener un Role a texto mas legible. */
export const roleToHumanReadable = (role: string | Roles): string => {
  switch (role) {
    case Roles.siteAdmin:
      return 'Administrador Web';
    case Roles.siteStaff:
      return 'Staff Web';
    case Roles.enterpriseAdmin:
      return 'Administrador';
    case Roles.enterpriseStaff:
      return 'Staff';
    case Roles.humanResources:
      return 'RRHH';
    case Roles.employee:
      return 'Empleado';
    case Roles.anonymous:
      return 'Anónimo';
    default:
      throw Error('Role no implementado');
  }
};
