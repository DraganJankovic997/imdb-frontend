<template>
    <div>
        <h1 v-if="details"> Title: {{ movie.title }}</h1>

        <router-link v-else :to="`/movies/${movie.id}`" ><h1>{{ movie.title }}</h1></router-link>


        <h3>
            Genre: {{ movie.genre.name }}
            <img v-if="movie.watched" src="../assets/download.jpg" class="small">
        </h3>
        <button v-if="details" @click="watched">Watch/unwatch me !</button>

        <p>Views: {{movie.views}}</p>
        <p>{{ desc }}</p>
        <img :src="movie.image_url" alt="Movie cover wallpaper">
    </div>
</template>

<script>
export default {
    props: ['movie', 'details'],
    methods: {
        watched() {
            this.$emit('watched');
        }
    },
    computed: {
        desc(){
            if(this.details) {
                return this.movie.description;
            }
            return this.lodash.truncate(this.movie.description, {
                'length': 50,
            });
        }
    }
}
</script>

<style>
    .small {
        display: inline;
        width: 50px;
        height: 50px;
    }
</style>