export default {
  path: 'dashboard',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'Dashboard',
      component: () => import('@/views/menus/dashboard/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
