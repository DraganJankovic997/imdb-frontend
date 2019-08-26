import axios from '../axios';
import constants from '../constants';


export default {

    login(data) {
        return axios.post(constants.API + constants.ROUTES.LOGIN, data).then((res)=> {
            localStorage.setItem('token', res['data']['access_token']);
            return res;
        });
    },
    register(data) {
        return axios.post(constants.API + constants.ROUTES.REGISTER, data);
    },
    isLoggedIn() {
        return !!this.getToken();
    },
    getToken(){
        return localStorage.getItem('token');
    },
    logout(){
        
    }
    
};