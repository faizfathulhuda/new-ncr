export default {
  path: 'summary',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'Summary',
      component: () => import('@/views/menus/report/summary/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
