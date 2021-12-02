import Vue from 'vue'
import VueRouter from 'vue-router'

// import { hasPermission } from '@/utils/permissions'
import dashboard from './dashboard'
// import suppliers from './suppliers'
// import products from './products'
// import supplierCategory from './supplierCategory'
// import productCategory from './productCategory'

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
    !NO_REDIRECTS.includes(to.path)
  ) {
    next('/403')
  } else {
    next()
  }
})

export default router
