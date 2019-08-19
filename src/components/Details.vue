<template>
    <div>
        <h1> Details: </h1>
        <h1>{{ getOne.title }}</h1>
        <h3>{{ getOne.genre.name }}</h3>
        <p>{{ getOne.description }}</p>
        <img :src="getOne.image_url" alt="Movie cover wallpaper">
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    created() {
        this.getDetails(this.$route.params.id);
        console.log("huehue");
    },
    computed : {
        ...mapGetters('movies', ['getOne']),
    },
    methods : {
        ...mapActions('movies', ['getDetails'])
    }
}
</script>

<style stored>
    
</style>