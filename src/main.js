import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client';
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://localhost:3000/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  // options: { path: "/my-app/" } 
}))


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(ElementUI)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
