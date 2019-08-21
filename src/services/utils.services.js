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
    getWatchedPage(page) {
        return axios.get(API + 'watchedPage/' + page);
    }
    // getPopular() {

    // },
    // getRelated(genre_id) {

    // }
    
};