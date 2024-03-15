/** URLs en la APP. */
export const SiteUrls = {
  home: '/',

  accounts: {
    register: '/accounts/register',
    registerSuccess: '/account/register-success',
    registerValidate: '/account/register-validate',
    recoveryPassword: '/account/recovery-password'
  },

  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },

  categoryAbsences: {
    list: '/category-absence',
    create: '/category-absence/create',
    update: '/category-absence/{id}/update'
  },

  companySettings: {
    details: '/company-setting',
    update: '/company-setting/update'
  },

  companyTasks: {
    list: '/task',
    details: '/task/{id}',
    create: '/task/create',
    update: '/task/{id}/update'
  },

  dashboard: {
    dashboard: '/dashboard'
  },

  departments: {
    list: '/department',
    details: '/department/{id}',
    create: '/department/create',
    update: '/department/{id}/update'
  },

  employeeHolidays: {
    home: '/employee-holiday'
  },

  employees: {
    list: '/employee',
    details: '/employee/{id}',
    update: '/employee/{id}/update',
    invite: '/employee/invite',
    settings: '/employee/settings',
    settingsEdit: '/employee/settings/update'
  },

  errors: {
    forbidden: '/error/403',
    notFound: '/error/404'
  },

  manageHolidays: {
    home: '/manage-holiday'
  },

  tests: {
    homeTests: '/test'
  },

  timeControlRecords: {
    home: '/time-control-record',
    create: '/time-control-record/create',
    update: '/time-control-record/{id}/update'
  },

  timeControl: {
    home: '/time-control'
  }
};
