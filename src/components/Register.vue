<template>
    <div id="register">
        <h3>Register</h3>
        <p>Name: <input v-model="user.name" type="text"></p>
        <p>Email: <input v-model="user.email" type="text"></p>
        <p>Password: <input v-model="user.password" type="password"></p>
        <p>Confirm password: <input v-model="user.password_confirmation" type="password"></p>
        <button @click="callRegister">Register</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';


export default {
    data : function () {
        return {
            user : {
                name: 'novitest',
                email: 'novitest@gmail.com',
                password: 'password',
                password_confirmation: 'password'
            }
        }
    },
    methods: {
        ...mapActions('users', ['register']),
        callRegister() {
            this.register(this.user)
            .then ((res) => {
            console.log(res);
            this.$router.push('/login');
            });
        },
        
        
    }
}
</script>

<style >
    
</style>