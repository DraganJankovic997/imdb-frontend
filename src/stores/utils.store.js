import utilsService from '../services/utils.services';

export default {
    namespaced: true,
    state: {
        watched: [],

    },
    mutations: {
        ADDWATCHED(store, payload) {
            store.watched = store.watched.concat(payload);
        },
        SETWATCHED(store, id) {
            let i = store.watched.indexOf(
                store.watched.find((w) => {
                    return w['movie_id'] == id;
                })
            );
            store.watched[i]['watched'] = !store.watched[i]['watched'];
        }
    },
    actions: {
        isWatched({commit}, id) {
            return utilsService.getWatched(id)
            .then((res) => {
                if(res['data'] == 'Watched') {
                    commit('ADDWATCHED', { 'movie_id': id, 'watched': true });
                } else {
                    commit('ADDWATCHED', { 'movie_id': id, 'watched': false })
                }
                return res;
            })
            .catch((err) => {
                return err;
            })
        },
        setWatched({commit}, id){
            return utilsService.setWatched(id)
            .then((res) => {
                commit('SETWATCHED', id);
                return res;
            })
            .catch((err) => {
                return err;
            });
        }
    },
    getters: {
        getWatched: (state) => (id) => {
            return state.watched.find((w) => {
                return w['movie_id'] == id;
            })
        },
    }
}