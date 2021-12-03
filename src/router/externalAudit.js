export default {
  path: 'external-audit',
  component: () => import('@/views/Route'),
  children: [
    {
      path: 'create',
      name: 'Create External Audit',
      component: () => import('@/views/menus/create/externalAudit/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
