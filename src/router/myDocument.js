export default {
  path: 'my-document',
  component: () => import('@/views/Route'),
  children: [
    {
      path: '',
      name: 'My Document',
      component: () => import('@/views/menus/document/myDocument/Index'),
      meta: {
        permission: true
      }
    }
  ]
}
