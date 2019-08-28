import axios from '../axios';
import constants from '../constants'


export default {

    get(movie_id, page){
        return axios.get(constants.API + 'comments/movies/' + movie_id + '?page=' + page);
    },
    postNew(type, id, content){
        if(type = 'movie') {
            return axios.post(constants.API + 'comments/movies/' + id, { content: content });
        }
        return axios.post(constants.API + 'comments/' + id, { content: content })
    }
}