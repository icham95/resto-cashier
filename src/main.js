// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import VueSocket from 'vue-socket.io'
import Notifications from 'vue-notification'
import VueLocalStorage from 'vue-localstorage'

// store vuex
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueSocket, 'http://localhost:3000', store)
Vue.use(Notifications)

Vue.use(VueLocalStorage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  localStorage: {
    dataUserLevel: {
      type: Object,
      default: {
        logged: false
      }
    }
  },
  template: '<App/>',
  components: { App }
})
