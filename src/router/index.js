import Vue from 'vue'
import VueRouter from 'vue-router'

// import dashboard from './dashboard'
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
      // { ...dashboard },
      // { ...suppliers },
      // { ...products },
      // { ...supplierCategory },
      // { ...productCategory },
      {
        path: '403',
        name: 'Forbidden',
        component: () => import('@/views/403')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/components/HelloWorld')
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
  if (to.path !== '/login' && !localStorage.getItem('token')) {
    next('/login')
  } else {
    next()
  }
})

export default router
