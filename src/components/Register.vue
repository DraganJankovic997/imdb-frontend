<template>
    <div id="register">
        <h3>Register</h3>
        <p>Name: <input v-model="user.name" type="text"></p>
        <p>Email: <input v-model="user.email" type="text"></p>
        <p>Password: <input v-model="user.password" type="password"></p>
        <button @click="callRegister">Register</button>
    </div>
</template>

<script>
import userService from '../services/user.service';


export default {
    data : function () {
        return {
            user : {
                name: 'novitest',
                email: 'novitest@gmail.com',
                password: 'password'
            }
        }
    },
    methods: {
        async callRegister() {
            await userService.register(this.user)
            .then (() => {
            this.$router.push('/movie');
            });
        },
        
        
    }
}
</script>

<style >
    
</style>