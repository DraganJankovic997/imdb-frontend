import moviesService from '../services/movie.service';
import movieService from '../services/movie.service';

export default {
    namespaced: true,
    state: {
        movies: [],
        oneMovie: null,
        genres: [],
        reacts: [],
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
        ADDNEW(state, newMovie) {
             var last = state.movies[state.movies.length-1][1];
             if(last.length < 10) {
                last.push(newMovie);
             } else {
                 state.movies.push([state.movies.length, [newMovie]]);
             }
        },
        ADDREACTS(state, newReacts){
            state.reacts.push(newReacts);
        },
        ADDREACTSPAGE(state, newReactsPage){
            state.reacts = state.reacts.concat(newReactsPage);
        },
        SETLASTPAGE(state, page){
            state.lastPage = page;
        }
    },
    actions: {
        loadPage({commit}, page) {
            return moviesService.loadPage(page)
            .then((res) => {
                commit('ADDMOVIES', [page, res['data']['data']]);
                commit('SETLASTPAGE', res['data']['last_page'])
            })
            .catch((err) => {
                return err;
            });
        },
        getDetails({commit}, id) {
            return moviesService.getOne(id)
            .then((res) => {
                commit('SETONE', res['data']);
            })
            .catch((err) => {
                console.log(err);
            });
        },
        genres({commit}){
            return moviesService.genres()
            .then((res)=>{
                commit('SETGENRES', res['data']);
            })
            .catch((err) => {
                return err;
            })
        }, 
        addMovie({commit}, data) {
            return movieService.post(data)
            .then((res) => {
                commit('ADDNEW', res['data']);
                return res;
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
                console.log(err);
            });
        },
        loadReacts({commit}, id){
            movieService.loadReacts(id)
            .then((res) => {
                commit('ADDREACTS', res['data']);
            })
            .catch((err) => {
                console.log(err);
            })
        },
        loadReactsPage({commit}, page) {
            return movieService.loadReactsPage(page)
            .then((res) =>{
                commit('ADDREACTSPAGE', res['data']);
            })
            .catch((err) => {
                return err;
            })
        },
        addReaction({}, payload){
            return movieService.addReaction(payload)
            .then((res)=>{
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
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
        getReacts: (state) => (id) => {
            return find(state.reacts, ['movie_id', id])
        },
        getLastPage: (state) => state.lastPage,
    }
}