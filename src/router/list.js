export default {
  path: 'list',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'List',
      component: () => import('@/views/menus/report/list/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
