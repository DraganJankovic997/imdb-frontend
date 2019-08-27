import axios from '../axios';
import constants from '../constants';

export default {

    getWatched(id) {
        return axios.get(constants.API + 'watched/' + id);
    },
    setWatched(id) {
        return axios.post(constants.API + 'watched/' + id);
    },
    getWatchedPage(page) {
        return axios.get(constants.API + 'watchedPage/' + page);
    },
    getPopular() {
        return axios.get(constants.API + 'popular/movies');
    },
    getRelated(genre_id) {
        return axios.get(constants.API+'related/movies/' + genre_id);
    }
    
};