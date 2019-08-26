import axios from '../axios';

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
    },
    getPopular() {
        return axios.get(API + 'popular');
    },
    getRelated(genre_id) {
        return axios.get(API+'related/' + genre_id);
    }
    
};