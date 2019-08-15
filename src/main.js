import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';

import Login from './components/Login';
import Movies from './components/Movies';
import Register from './components/Register';

Vue.component('app-login', Login);



Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/movies', component: Movies },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
