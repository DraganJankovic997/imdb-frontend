import axios from '../axios';
import constants from '../constants';

const API = 'http://localhost:8000/api/';


export default {
    getAll(){
        return axios.get(API + 'movies');
    },
    getOne(id){
        return axios.get(API + 'movies/' + id);
    },
    loadPage(page){
        return axios.get(API+'movies'+'?page='+page);
    },
    post(data) {
        return axios.post(API + 'movies', data);
    },
    genres(){
        return axios.get(API + 'genres');
    },
    search(search){
        delete axios.defaults.headers.common["Authorization"];
        return axios.get('http://www.omdbapi.com/?apikey=' + constants.OMDB_API_KEY + '&t=' + search);
    },
    addReaction(data) {
        return axios.post(API + 'react', data);
    },
}