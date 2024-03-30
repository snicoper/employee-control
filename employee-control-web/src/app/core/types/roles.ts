/** Roles del sitio. */
export enum Roles {
  enterpriseAdmin = 'EnterpriseAdmin',
  enterpriseStaff = 'EnterpriseStaff',
  humanResources = 'HumanResources',
  employee = 'Employee',
  anonymous = 'Anonymous'
}

/** Obtener un Role a texto mas legible. */
export const roleToHumanReadable = (role: string | Roles): string => {
  switch (role) {
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
