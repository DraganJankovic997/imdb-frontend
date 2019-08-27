import axios from '../axios';
import constants from '../constants'


export default {

    get(movie_id, page){
        if(page){
            return axios.get(constants.API + 'comments/movies/' + movie_id + '?page=' + page);
        }
        return axios.get(constants.API + 'comments/movies/' + movie_id);
    },
    postNew(movie_id, content){
        return axios.post(constants.API + 'comments/movies/' + movie_id, { content: content });
    }
}