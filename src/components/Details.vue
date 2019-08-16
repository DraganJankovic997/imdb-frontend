<template>
    <div>
        <h1> Details: </h1>
        <h1>{{ movie.title }}</h1>
        <p>{{ movie.description }}</p>
        <img :src="movie.image_url" alt="Movie cover wallpaper">
    </div>
</template>

<script>
import movieService from '../services/movie.service';

export default {
    data () {
        return {
            movie: null,
        }
    },
    created() {
        movieService.getOne(this.$route.params.id).then((res) => {
            this.movie = res['data'];
        });
    }
}
</script>

<style stored>
    
</style>