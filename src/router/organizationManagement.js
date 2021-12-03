export default {
  path: 'organization-management',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'Organization Management',
      component: () => import('@/views/menus/settings/organizationManagement/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
