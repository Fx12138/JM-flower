import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueSocketIO from 'vue-socket.io'
import socketio from 'socket.io-client';
Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'http://212.129.235.112:3000/',
  // connection: 'http://flower.pushyzheng.com/',
  connection: 'http://localhost:3000/',
  // options: { path: "/", transports: ['websocket', 'polling', 'flashsocket'] },
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  // options: { path: "/my-app/" } 
}))


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
