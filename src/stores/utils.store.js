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
        setWatched({commit}, id){
            return utilsService.setWatched(id)
            .then((res) => {
                commit('movies/SETWATCHED', id, {root: true});
                return res;
            })
            .catch((err) => {
                console.log(err);
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
        getListOfTen: (state) => state.listOfTen,
    }
}