import axios from '../axios';

const API = 'http://localhost:8000/api/comments/';

export default {

    get(movie_id, page){
        return axios.get(API + movie_id + '?page=' + page);
    },
    
    postNew(movie_id, content){
        return axios.post(API + movie_id, {'content': content});
    }

}