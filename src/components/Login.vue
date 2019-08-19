<template>
    <div >
        <h3>Login</h3>
        <p>Email: <input v-model="user.email" type="text"></p>
        <p>Password: <input v-model="user.password" type="password"> </p>
        <button @click="callLogin">Login</button>
    </div>
</template>

<script>
import userService from '../services/user.service';

export default {
    data: function () {
        return {
            user : {
                email : 'test@test.com',
                password: 'password'
            }
        }
    },
    methods : {
        callLogin(){
            userService.login(this.user)
            .then((res)=> {
                this.$router.push('/movies');
            })
            .catch((err) => {
                console.log(err.message);
            });
        },
    }
}
</script>

<style >
    
</style>