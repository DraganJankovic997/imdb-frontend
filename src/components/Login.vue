<template>
    <div >
        <h3>Login</h3>
        <p>Email: <input v-model="user.email" type="text"></p>
        <p>Password: <input v-model="user.password" type="password"> </p>
        <button @click="callLogin">Login</button>
    </div>
</template>

<script>

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
            
        },
    }
}
</script>

<style >
    
</style>