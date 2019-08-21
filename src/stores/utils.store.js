import utilsService from '../services/utils.services';

export default {
    namespaced: true,
    state: {
        watched: [],
        popular: []
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
        },
        ADDPOPULAR(state, data) {
            state.popular = data;
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
        },
        getWatchedPage({commit}, page) {
            return utilsService.getWatchedPage(page)
            .then((res) => {
                commit('ADDWATCHED', res['data']);
                return res;
            })
            .catch((err) => {
                return err;
            });
        },
        loadPopular({commit}){
            return utilsService.getPopular()
            .then((res) => {
                commit('ADDPOPULAR', res['data']);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    },
    getters: {
        getWatched: (state) => (id) => {
            return state.watched.find((w) => {
                return w['movie_id'] == id;
            })
        },
        getPopular: (state) => state.popular,
    }
}