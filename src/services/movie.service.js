import axios from '../axios';

const API = 'http://localhost:8000/api/';
const API_KEY = '4f14d178';

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
        return axios.get('http://www.omdbapi.com/?apikey=' + API_KEY + '&t=' + search);
    },
    viewMovie(id){
        return axios.post(API + 'viewmoviepage/' + id);
    },
    loadReacts(id){
        return axios.get(API + 'react/' + id);
    }
}