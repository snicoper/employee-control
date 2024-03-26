/** URLs en la APP. */
export const SiteUrls = {
  home: '/',

  accounts: {
    register: '/accounts/register',
    registerSuccess: '/accounts/register-success',
    registerValidate: '/accounts/register-validate',
    recoveryPassword: '/accounts/recovery-password'
  },

  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },

  categoryAbsences: {
    list: '/category-absences',
    create: '/category-absences/create',
    update: '/category-absences/{id}/update'
  },

  companySettings: {
    details: '/company-settings',
    update: '/company-settings/update'
  },

  companyTasks: {
    list: '/tasks',
    details: '/tasks/{id}',
    create: '/tasks/create',
    update: '/tasks/{id}/update'
  },

  dashboard: {
    dashboard: '/dashboard'
  },

  departments: {
    list: '/departments',
    details: '/departments/{id}',
    create: '/departments/create',
    update: '/departments/{id}/update'
  },

  employeeHolidays: {
    home: '/employee-holidays'
  },

  employees: {
    list: '/employees',
    details: '/employees/{id}',
    update: '/employees/{id}/update',
    invite: '/employees/invite',
    settings: '/employees/settings',
    settingsUpdate: '/employees/settings/update'
  },

  errors: {
    forbidden: '/errors/403',
    notFound: '/errors/404'
  },

  manageHolidays: {
    home: '/manage-holidays'
  },

  tests: {
    homeTests: '/tests'
  },

  timeControlRecords: {
    home: '/time-control-records',
    create: '/time-control-records/create',
    update: '/time-control-records/{id}/update'
  },

  timesControl: {
    home: '/times-control'
  }
};
