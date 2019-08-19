<template>
    <div>
        <h1> Details: </h1>
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.description }}</p>
        <img :src="movie.image_url" alt="Movie cover wallpaper">
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data () {
        return {
            movie: null,
        }
    },
    created() {
        this.movie = {...this.getOne(this.$route.params.id)};
    },
    computed : {
        ...mapGetters('movies', ['getOne']),
    }
}
</script>

<style stored>
    
</style>