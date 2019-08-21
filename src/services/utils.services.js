import axios from '../axios';
import constants from '../constants';

const API = 'http://localhost:8000/api/';

export default {

    getWatched(id) {
        return axios.get(API + 'watched/' + id);
    },
    setWatched(id) {
        return axios.post(API + 'watched/' + id);
    },
    // getPopular() {

    // },
    // getRelated(genre_id) {

    // }
    
};