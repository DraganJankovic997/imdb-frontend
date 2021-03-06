import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from './axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex';
import constants from './constants';
import userService from './services/user.service';
import store from './store';
import VueLodash from 'vue-lodash'

import Login from './components/Login';
import Movies from './components/Movies';
import Register from './components/Register';
import Details from './components/Details';
import Create from './components/Create';
import Comments from './components/Comments';
import Popular from './components/Popular';
import Reacts from './components/Reacts';
import Movie from './components/Movie';
Vue.component('app-comments', Comments);
Vue.component('app-popular', Popular);
Vue.component('app-reacts', Reacts);
Vue.component('app-movie', Movie);


Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
const options = { name: 'lodash' }
Vue.use(VueLodash, options);


const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/movies', component: Movies },
    { path: '/movies/:id', component: Details },
    { path: '/register', component: Register },
    { path: '/login', component: Login },
    { path: '/create', component:Create },
    { path: '/', redirect: '/movies' }
  ]
});

router.beforeEach((to, from, next) => {
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
});






new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
