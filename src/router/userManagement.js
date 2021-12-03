export default {
  path: 'user-management',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'User Management',
      component: () => import('@/views/menus/settings/userManagement/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
