import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jQuery from 'jquery'
import VueProgressBar from 'vue-progressbar'
import zh_TW from 'vee-validate/dist/locale/zh_TW'
import VeeValidate, {Validator} from 'vee-validate'


import './assets/stylesheets/all.scss'
global.$ = jQuery
Vue.use(VueAxios, axios)
Vue.use(VeeValidate, { events: 'blur' })
Validator.localize('zh_TW', zh_TW);
Vue.use(VueProgressBar, {
  color: '#f94665',
  failedColor: 'red',
  height: '2px'
})

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://jsonbin.org/ambermiao/iorder'
axios.defaults.headers.common['Authorization'] = "token e311ae9a-8ad0-4b12-aa75-54450f41b88c";
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.is_login) {
      next()
      return
    }
    next({
      path: '/'
    })
  } else {
    next()
  }
  if (to.matched.some(record => record.meta.notAuth)) {
    if (store.state.is_login) {
      next({
        path: '/payment'
      })
      return
    }
    next()
  } else {
    next()
  }
})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
