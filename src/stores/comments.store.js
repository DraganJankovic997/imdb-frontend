import commentsService from '../services/comments.service';

export default {
    namespaced: true,
    state: {
        comments: [],
        lastPage: 0
    },
    mutations: {
        ADDCOMMENTS(state, newComments){
            state.comments = state.comments.concat(newComments);
        },
        RESETCOMMENTS(state){
            state.comments = [];
        },
        SETLASTPAGE(state, page){
            state.lastPage = page;
        },
        SETALL(state, comments) {
            state.comments = comments;
        }
    },
    actions: {
        loadComments({commit}, payload){
            if(payload['page'] == 1) {
                commit('RESETCOMMENTS');
            }
            return commentsService.get(payload['movie_id'], payload['page'])
            .then((res) => {
                commit('ADDCOMMENTS', res['data']['data']);
                commit('SETLASTPAGE', res['data']['last_page'])
            })
            .catch((err) => {
                return err;
            });
        },
        postComment({commit, dispatch}, payload){
            return commentsService.postNew(payload['movie_id'], payload['content'])
            .then((res) => {
                dispatch('loadComments', { movie_id: payload['movie_id']})
                .then((res) => {
                    commit('ADDCOMMENTS', res['data']);
                    return res;
                });
            })
            .catch((err) => {
                return err;
            });
        },
    },
    getters: {
        getComments: (state) => state.comments,
        getLastPage: (state) => state.lastPage
    }
}