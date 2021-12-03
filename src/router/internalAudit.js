export default {
  path: 'internal-audit',
  component: () => import('@/views/Route'),
  children: [
    {
      path: 'create',
      name: 'Create Internal Audit',
      component: () => import('@/views/menus/create/internalAudit/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
