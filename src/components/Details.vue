<template>
    <div v-if="getOne != null">
        <h1> Details: </h1>
        <h1> Title: {{ getOne.title }}</h1>
        <h3> Genre: {{ getOne.genre.name }}</h3>
        <p>Views: {{getOne.views}}</p>
        <p>{{ getOne.description }}</p>
        <img :src="getOne.image_url" alt="Movie cover wallpaper">
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    created() {
        this.getDetails(this.$route.params.id);
        this.viewMovie(this.$route.params.id);
    },
    computed : {
        ...mapGetters('movies', ['getOne']),
    },
    methods : {
        ...mapActions('movies', ['getDetails', 'viewMovie'])
    }
}
</script>

<style stored>
    
</style>