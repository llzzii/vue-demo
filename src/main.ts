import Vue from 'vue'
import './plugins/axios'
import App from '@/App.vue'
import './registerServiceWorker'
import router from '@/router'
import store from './store'
import './plugins/element.js'
import './plugins/axios.js'
import { AxiosInstance } from 'axios'
import './assets/iconfont/iconfont.css'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance
  }
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
