import axios from '../axios';
import constants from '../constants';

const API = 'http://localhost:8000/api';
const ROUTES = {
    'LOGIN' : '/auth/login',
    'REGISTER' : '/auth/register',
    'ME' : '/auth/me',
    'REFRESH' : '/auth/refresh'
};

export default {

    login(data) {
        return axios.post(API + ROUTES.LOGIN, data);
    },
    register(data) {
        return axios.post(API + ROUTES.REGISTER, data);
    },
    isLoggedIn() {
        return !!this.getToken();
    },
    getToken(){
        return localStorage.getItem('token');
    },
    logout(){
        localStorage.removeItem('token');
    }
    
};