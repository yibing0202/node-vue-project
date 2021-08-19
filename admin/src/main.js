import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    getHeadersAuthor() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})
import http from 'network/http'
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
