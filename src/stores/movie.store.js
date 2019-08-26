import moviesService from '../services/movie.service';
import movieService from '../services/movie.service';

export default {
    namespaced: true,
    state: {
        movies: [],
        oneMovie: null,
        genres: [],
        lastPage: 0
    },
    mutations: {
        SETMOVIES(state, movies) {
            state.movies.push([1, movies]);
        },
        ADDMOVIES(state, payload) {
            state.movies.push(payload);
        },
        SETONE(state, one) {
            state.oneMovie = one;
        },
        SETGENRES(state, genres){
            state.genres = genres;
        },
        SETLASTPAGE(state, page) {
            state.lastPage = page;
        },
        SETWATCHED(state, id) {
            state.oneMovie['watched'] = !state.oneMovie['watched'];
        }
    },
    actions: {
        loadPage({commit}, page) {
            return moviesService.loadPage(page)
            .then((res) => {
                commit('ADDMOVIES', [page, res['data']['data']]);
                commit('SETLASTPAGE', res['data']['last_page']);
                return res;
            })
            .catch((err) => {
                return err;
            });
        },
        getDetails({commit}, id) {
            return moviesService.getOne(id)
            .then((res) => {
                commit('SETONE', res['data']);
                return res;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        genres({commit}){
            return moviesService.genres()
            .then((res)=>{
                commit('SETGENRES', res['data']);
                return res;
            })
            .catch((err) => {
                return err;
            })
        }, 
        addMovie({commit}, data) {
            return movieService.post(data)
            .then((res) => {
                return res['data'];
            })
            .catch((err) => {
                return err;
            });
        },
        search({commit}, title) {
            return movieService.search(title)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
        },
        addReaction({}, payload){
            return movieService.addReaction(payload)
            .then((res)=>{
                return res;
            })
            .catch((err) => {
                return err;
            });
        }

    },
    getters: {
        getAll : (state) => state.movies,
        getOne : (state) => state.oneMovie,
        getPage : (state) => (page) => {
            var movie;
            for(let m of state.movies){
                if(m[0] === page) return movie = m[1];
            }
            return movie;
        },
        getGenres : (state) => state.genres,
        getLastPage: (state) => state.lastPage,
    }
}