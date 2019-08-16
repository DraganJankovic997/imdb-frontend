import axios from 'axios';
import store from './store'

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

// axios.interceptors.response.use((res) => {
//     return res;
// }, (err) => {
//     if(err.response.status === 401) {
//         store.dispatch('user/logout')
//         alert('401: Unauthorized');
//     }    
// });


export default axios;