export default {
  path: 'need-my-approval',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'Need My Approval',
      component: () => import('@/views/menus/document/needMyApproval/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
