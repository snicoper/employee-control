/** Roles del sitio. */
export enum Role {
  Admin = 'Admin',
  Staff = 'Staff',
  HumanResources = 'HumanResources',
  Employee = 'Employee',
  Anonymous = 'Anonymous'
}

/** Obtener un Role a texto mas legible. */
export const roleToHumanReadable = (role: string | Role): string => {
  switch (role) {
    case Role.Admin:
      return 'Administrador';
    case Role.Staff:
      return 'Staff';
    case Role.HumanResources:
      return 'RRHH';
    case Role.Employee:
      return 'Empleado';
    case Role.Anonymous:
      return 'Anónimo';
    default:
      throw Error('Role no implementado');
  }
};
