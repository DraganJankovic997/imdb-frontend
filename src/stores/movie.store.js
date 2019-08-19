import moviesService from '../services/movie.service';

export default {
    namespaced: true,
    state: {
        movies: [],
    },
    mutations: {
        SETMOVIES(state, movies) {
            state.movies.push([1, movies]);
        },
        ADDMOVIES(state, payload) {
            state.movies.push(payload);
        },
    },
    actions: {
        loadPage({commit}, page) {
            moviesService.loadPage(page)
            .then((res) => {
                commit('ADDMOVIES', [page, res['data']['data']]);
            })
            .catch((err) => {
                return err;
            });
        }


    },
    getters: {
        getAll : (state) => state.movies,
        getOne : (state) => (id) => {
            return state.movies.find((movie) => {
                  return movie.id == id;
            });
        },
        getPage : (state) => (page) => {
            var movie;
            for(let m of state.movies){
                if(m[0] === page) return movie = m[1];
            }
            return movie;
        },
    }
}