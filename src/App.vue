<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/register">Register</router-link>
      </li>
      <li>
        <router-link to="/movies">Movies</router-link>
      </li>
      <li>
        <router-link to="/create">Create</router-link>
      </li>
      <li>
        <button @click="callLogout()"> Logout </button>

      </li>
    </ul>


    <router-view />


  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'app',
  components: {
    
  },
  methods : {
    ...mapActions('users', ['logout']),
    async callLogout(){
      try{
        await this.logout()
        .then(() => {
          this.$router.push('/login');
        });
      } catch(ex) {
        console.log(ex);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
button {
    height: 40px;
    width: 100px;
}
body {
  margin: 0;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}
</style>
