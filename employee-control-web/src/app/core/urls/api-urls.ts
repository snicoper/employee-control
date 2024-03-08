/** URLs en la API. */
export const ApiUrls = {
  admin: {
    accounts: {
      getAdminAccountsPaginated: '/admin/accounts/paginated'
    }
  },

  auth: {
    login: '/auth/login',
    refreshToken: '/auth/refresh-token'
  },

  accounts: {
    registerAccount: '/accounts/register',
    registerValidateEmail: '/accounts/validate-email',
    emailValidationForwarding: '/accounts/resend-email-validation',
    recoveryPassword: '/accounts/recovery-password',
    recoveryPasswordChange: '/accounts/recovery-password-change'
  },

  companies: {
    getCompanyByCurrentUser: '/companies/current-user'
  },

  categoryAbsences: {
    getCategoryAbsenceByCompanyIdPaginated: '/category-absence/companies/{companyId}/paginated',
    getCategoryAbsenceById: '/category-absence/{id}',
    createCompanyAbsence: '/category-absence',
    updateCategoryAbsence: '/category-absence/{id}'
  },

  companyTasks: {
    getCompanyTasksByCompanyIdPaginated: '/tasks/companies/{companyId}/paginated',
    getEmployeesByCompanyTaskIdPaginated: '/tasks/{id}/employees/paginated',
    getCompanyTasksByEmployeeIdPaginated: '/tasks/employees/{employeeId}/paginated',
    getEmployeesUnassignedTaskByCompanyTaskId: '/tasks/{id}/employees/unassigned',
    getCompanyTasksById: '/tasks/{id}',
    createCompanyTask: '/tasks',
    assignEmployeesToTask: '/tasks/{id}/employees/assign',
    updateCompanyTask: '/tasks/{id}',
    activateCompanyTask: '/tasks/{id}/activate',
    deactivateCompanyTask: '/tasks/{id}/deactivate'
  },

  departments: {
    getDepartmentsByCompanyIdPaginated: '/departments/companies/{companyId}/paginated',
    getEmployeesByCompanyIdPaginated: '/departments/{id}/employees/paginated',
    GetEmployeesByDepartmentIdPaginated: '/departments/{id}/employees/unassigned',
    getDepartmentsByEmployeeIdPaginated: '/departments/employees/{employeeId}/paginated',
    getDepartmentById: '/departments/{id}',
    createDepartment: '/departments',
    assignEmployeesToDepartment: '/departments/{id}/employees/assign',
    updateDepartment: '/departments/{id}',
    activateDepartment: '/departments/activate',
    deactivateDepartment: '/departments/deactivate'
  },

  employees: {
    getEmployeesPaginated: '/employees/paginated',
    getEmployeeById: '/employees/{id}',
    getRolesByEmployeeId: '/employees/{id}/roles',
    inviteEmployee: '/employees/invite',
    updateEmployeeRoles: '/employees/{id}/roles',
    deactivateEmployee: '/employees/{id}/deactivate',
    activateEmployee: '/employees/{id}/activate',
    updateEmployee: '/employees',
    addRoleHumanResources: '/employees/{id}/add-role-rrhh',
    removeRoleHumanResources: '/employees/{id}/remove-role-rrhh',
    getCurrentEmployeeSettings: '/employees/settings',
    updateEmployeeSettings: '/employees/{id}/employee-settings'
  },

  companySettings: {
    getCompanySettingsByCompanyId: '/company-settings/companies/{companyId}',
    updateCompanySettings: '/company-settings'
  },

  identityRoles: {
    getAllIdentityRoles: '/identity-roles'
  },

  localizations: {
    currentLocale: '/localizations/current-locale',
    supportedLocales: '/localizations/supported-locales'
  },

  timeControl: {
    getTimesControlByCompanyIdPaginated: '/times-control/companies/{companyId}/from/{from}/to/{to}/paginated',
    getTimesControlByEmployeeIdPaginated: '/times-control/employees/{employeeId}/from/{from}/to/{to}/paginated',
    getTimeControlById: '/times-control/{id}',
    getCurrentStateTimeControl: '/times-control/employees/{employeeId}/time-state',
    getTimeControlRangeByEmployeeId: '/times-control/employees/{employeeId}/from/{from}/to/{to}',
    getTimeStateOpenByEmployeeId: '/times-control/employees/{employeeId}/time-state-open',
    createTimeControl: '/times-control',
    startTimeControl: '/times-control/start',
    finishTimeControl: '/times-control/finish',
    finishTimeControlByStaff: '/times-control/finish/staff',
    updateTimeControl: '/times-control/{id}',
    deleteTimeControl: '/times-control/{id}'
  }
};
