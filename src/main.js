import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from './axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import constants from './constants';
import userService from './services/user.service';
import store from './store';

import Login from './components/Login';
import Movies from './components/Movies';
import Register from './components/Register';
import Details from './components/Details';


Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/movies', component: Movies },
    { path: '/movies/:id', component: Details },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
  ]
});

router.beforeEach((to, from, next) => {
  try {
    if(constants['forNonUsers'].includes(to.fullPath)){
      if(userService.isLoggedIn()) {
        next({ path : '/movies' });
        return;
      }
    } else {
      if(!userService.isLoggedIn()) {
        next({ path : '/login' });
        return;
      }
    }
    next();
  } catch (err) {
    console.log(err);
  }
});






new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
