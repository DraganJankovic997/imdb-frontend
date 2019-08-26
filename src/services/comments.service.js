import axios from '../axios';
import constants from '../constants'


export default {

    get(movie_id, page){
        return axios.get(constants.COMMENTS_API + movie_id + '?page=' + page);
    },
    
    postNew(movie_id, content){
        return axios.post(constants.COMMENTS_API + movie_id, {'content': content});
    }

}