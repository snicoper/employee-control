/** API URLs. */
export const ApiUrl = {
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

  companyCalendar: {
    getCompanyCalendars: '/company-calendars',
    getCompanyCalendarById: '/company-calendars/{id}',
    createCompanyCalendar: '/company-calendars',
    updateCompanyCalendar: '/company-calendars/{id}',
    setDefaultCalendar: '/company-calendars/{id}/default'
  },

  companyCalendarHolidays: {
    getCompanyCalendarHolidaysByCompanyCalendarIdAndYear:
      '/company-calendar-holidays/company-calendars/{companyCalendarId}/year/{year}',
    createCompanyCalendarHoliday: '/company-calendar-holidays',
    updateCompanyCalendarHoliday: '/company-calendar-holidays/{id}',
    deleteCompanyCalendarHoliday: '/company-calendar-holidays/{id}'
  },

  categoryAbsences: {
    getCategoryAbsencePaginated: '/category-absence/paginated',
    getCategoryAbsenceById: '/category-absence/{id}',
    createCompanyAbsence: '/category-absence',
    updateCategoryAbsence: '/category-absence/{id}'
  },

  companyTasks: {
    getCompanyTasksPaginated: '/tasks/paginated',
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
    getDepartmentsPaginated: '/departments/paginated',
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

  employeeHolidays: {
    getEmployeeHolidaysByYearPaginated: '/employee-holidays/year/{year}/paginated',
    getOrCreateEmployeeHolidaysByYearAndEmployeeId: '/employee-holidays/year/{year}/employees/{employeeId}'
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
    getCurrentEmployee: '/employees/current',
    getCurrentEmployeeSettings: '/employees/settings',
    updateEmployeeSettings: '/employees/{id}/employee-settings'
  },

  companySettings: {
    getCompanySettings: '/company-settings',
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
    getTimesControlByRangePaginated: '/times-control/from/{from}/to/{to}/paginated',
    getTimesControlByEmployeeIdPaginated: '/times-control/employees/{employeeId}/from/{from}/to/{to}/paginated',
    getTimeControlById: '/times-control/{id}',
    getTimeControlWithEmployeeById: '/times-control/{id}/employees',
    getCurrentStateTimeControl: '/times-control/employees/{employeeId}/time-state',
    getTimeControlRangeByEmployeeId: '/times-control/employees/{employeeId}/from/{from}/to/{to}',
    getTimeStateOpenByEmployeeId: '/times-control/employees/{employeeId}/time-state-open',
    getTimeControlIncidencesCount: '/times-control/incidences-count',
    createTimeControl: '/times-control',
    startTimeControl: '/times-control/start',
    updateTimeControl: '/times-control/{id}',
    closeIncidence: '/times-control/{id}/close-incidence',
    finishTimeControl: '/times-control/finish',
    finishTimeControlByStaff: '/times-control/finish/staff',
    createIncidence: '/times-control/{id}/create-incidence',
    deleteTimeControl: '/times-control/{id}'
  },

  workingDaysWeek: {
    getWorkingDaysWeek: '/working-days-week',
    updateWorkingDaysWeek: '/working-days-week/{id}'
  }
};
