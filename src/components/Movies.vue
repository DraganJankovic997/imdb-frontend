<template>
    <div>
        
        <h1>Movies: </h1>

        <div v-for="m in movies" :key="m.id">

            <h3>{{ m.title }}</h3>
            <h5>{{ m.genre_id }}</h5>
            <p>{{ trim(m.description) }} </p>
            <img :src="m.image_url" alt="Movie wallpaper">
            <button @click="toDetails(m.id)">Details</button>

        </div>



   </div>
</template>


<script>
import movieService from '../services/movie.service';

export default {
    data () {
        return {
            movies: []
        }
    },
    created () {
        movieService.getAll()
        .then((res) => {
            this.movies = res['data'];
        });
    },
    methods: {
        toDetails (id){
            this.$router.push('/movies/'+id);
        },
        trim (text) {
            var arr = text.trim();
	        arr = arr.split(' ').slice(0, 20);
            text = arr.join(' ') + '...';
            return text;
        }
    }
}
</script>

<style stored>
    
</style>