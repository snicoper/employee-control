/** URLs en la APP. */
export const SiteUrls = {
  home: '/',

  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },

  categoryAbsences: {
    list: '/category-absence',
    create: '/category-absence/create',
    update: '/category-absence/{id}/update'
  },

  accounts: {
    register: '/accounts/register',
    registerSuccess: '/account/register-success',
    registerValidate: '/account/register-validate',
    recoveryPassword: '/account/recovery-password'
  },

  companySettings: {
    details: '/company-setting/details',
    update: '/company-setting/update'
  },

  companyTasks: {
    list: '/task',
    details: '/task/{id}',
    create: '/task/create',
    update: '/task/{id}/update'
  },

  departments: {
    list: '/department',
    details: '/department/{id}',
    create: '/department/create',
    update: '/department/{id}/update'
  },

  employees: {
    list: '/employee',
    details: '/employee/{id}',
    update: '/employee/{id}/update',
    invite: '/employee/invite',
    settings: '/employee/settings',
    settingsEdit: '/employee/settings/update'
  },

  dashboard: {
    dashboard: '/dashboard'
  },

  tests: {
    homeTests: '/test'
  },

  timeControlRecords: {
    home: '/time-control-record',
    create: '/time-control-record/create'
  },

  timeControl: {
    home: '/time-control'
  },

  errors: {
    forbidden: '/error/403',
    notFound: '/error/404'
  }
};
