import userService from '../services/user.service';

export default {
    namespaced: true,
    state: {
        user: null,
        token: null
    },
    mutations: {
        SETTOKEN(state, token) {
            state.token = token;
        },
        SETUSER(state, user) {
            state.user = user;
        }
    },
    actions: {
        logout() {
            userService.logout();
        }
    },
    getters: {
        
    }
}