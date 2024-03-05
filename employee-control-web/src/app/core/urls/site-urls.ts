/** URLs en la APP. */
export const SiteUrls = {
  home: '/',

  auth: {
    login: '/auth/login',
    logout: '/auth/logout'
  },

  categoryAbsence: {
    list: '/category-absences',
    create: '/category-absences/create',
    edit: '/category-absences/edit'
  },

  accounts: {
    register: '/accounts/register',
    registerSuccess: '/accounts/register-success',
    registerValidate: '/accounts/register-validate',
    recoveryPassword: '/accounts/recovery-password'
  },

  companySettings: {
    details: '/company-settings/details',
    edit: '/company-settings/edit'
  },

  companyTasks: {
    list: '/tasks',
    details: '/tasks/{id}',
    create: '/tasks/create',
    edit: '/tasks/{id}/edit'
  },

  departments: {
    list: '/departments',
    details: '/departments/{id}',
    create: '/departments/create',
    edit: '/departments/{id}/edit'
  },

  employees: {
    list: '/employees',
    details: '/employees/{id}',
    edit: '/employees/{id}/edit',
    invite: '/employees/invite',
    settings: '/employees/settings',
    settingsEdit: '/employees/settings/edit'
  },

  dashboard: {
    dashboard: '/dashboard'
  },

  tests: {
    homeTests: '/tests'
  },

  timeControlRecords: {
    home: '/time-control-records',
    create: '/time-control-records/create'
  },

  timeControl: {
    home: '/time-control'
  },

  errors: {
    forbidden: '/errors/403',
    notFound: '/errors/404'
  }
};
