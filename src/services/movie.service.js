import axios from '../axios';

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
    }
}