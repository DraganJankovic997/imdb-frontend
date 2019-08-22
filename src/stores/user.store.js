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
            return userService.logout();
        },
        login({}, user){
            return userService.login(user)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            })
        },
        register({}, user){
            return userService.register(user)
            .then((res) => {
                return res;
            }).catch((err) => {
                return err;
            });
        }
    },
    getters: {
        
    }
}