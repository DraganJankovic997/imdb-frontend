import utilsService from '../services/utils.services';

export default {
    namespaced: true,
    state: {
        watched: [],
        listOfTen: []
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
        ADDLISTOFTEN(state, data) {
            state.listOfTen = data;
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
                console.log(err);
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
                commit('ADDLISTOFTEN', res['data']);
            })
            .catch((err) => {
                console.log(err);
            })
        },
        loadRelated({commit}, genre_id){
            return utilsService.getRelated(genre_id)
            .then((res) => {
                commit('ADDLISTOFTEN', res['data']);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    },
    getters: {
        getWatched: (state) => (id) => {
            return state.watched.find((w) => {
                return w['movie_id'] == id;
            })
        },
        getListOfTen: (state) => state.listOfTen,
    }
}