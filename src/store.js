import Vue from 'vue';
import Vuex from 'vuex';
import users from './stores/user.store';
import movies from './stores/movie.store';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        users,
        movies
    }
}); 