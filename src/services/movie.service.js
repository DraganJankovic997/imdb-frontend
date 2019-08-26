import axios from '../axios';
import constants from '../constants';


export default {
    getAll(){
        return axios.get(constants.API + 'movies');
    },
    getOne(id){
        return axios.get(constants.API + 'movies/' + id);
    },
    loadPage(page){
        return axios.get(constants.API+'movies'+'?page='+page);
    },
    post(data) {
        return axios.post(constants.API + 'movies', data);
    },
    genres(){
        return axios.get(constants.API + 'genres');
    },
    search(search){
        delete axios.defaults.headers.common["Authorization"];
        return axios.get('http://www.omdbapi.com/?apikey=' + constants.OMDB_API_KEY + '&t=' + search);
    },
    addReaction(data) {
        return axios.post(constants.API + 'react', data);
    },
}