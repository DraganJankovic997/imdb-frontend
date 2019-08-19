import axios from '../axios';

const API = 'http://localhost:8000/api/movies';


export default {
    getAll(){
        return axios.get(API);
    },
    getOne(id){
        return axios.get(API + '/' + id);
    },
    loadPage(page){
        return axios.get(API+'?page='+page);
    }
}