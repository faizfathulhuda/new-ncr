import Vue from 'vue'
import moment from 'moment'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/icons'
import '@/validations'
import router from './router'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.mixin({
  methods: {
    moment
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
