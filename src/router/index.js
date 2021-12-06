import Vue from 'vue'
import VueRouter from 'vue-router'

// for implement permission menu
// import { hasPermission } from '@/utils/permissions'
import dashboard from './dashboard'
import externalAudit from './externalAudit'
import internalAudit from './internalAudit'
import myDocument from './myDocument'
import needMyApproval from './needMyApproval'
import summary from './summary'
import list from './list'
import organizationManagement from './organizationManagement'
import userManagement from './userManagement'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home'),
    children: [
      {
        path: '',
        redirect: () => '/dashboard'
      },
      { ...dashboard },
      { ...externalAudit },
      { ...internalAudit },
      { ...myDocument },
      { ...needMyApproval },
      { ...summary },
      { ...list },
      { ...organizationManagement },
      { ...userManagement },
      {
        path: '403',
        name: 'Forbidden',
        component: () => import('@/views/403')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const NO_REDIRECTS = [
    '/login',
    '/dashboard',
    '/403'
  ]

  if (to.path !== '/login' && !localStorage.getItem('token')) {
    localStorage.setItem('route', to.fullPath)
    next('/login')
  } else if (
    !NO_REDIRECTS.includes(to.path) &&
    !to.meta.permission
  ) {
    next('/403')
  } else {
    next()
  }
})

export default router
