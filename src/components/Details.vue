<template>
    <div v-if="getOne != null">
        <h1> Details: </h1>
        <h1> Title: {{ getOne.title }}</h1>
        <h3> Genre: {{ getOne.genre.name }}</h3>
        <p>Views: {{getOne.views}}</p>
        <p>{{ getOne.description }}</p>
        <img :src="getOne.image_url" alt="Movie cover wallpaper">
        
        <div v-if="getReacts(getOne.id) != null" >
            <p>Likes : {{getReacts(getOne.id)['emotes'][0]}}</p>
        </div>
        <button @click="react(getOne.id, 1)">Like !</button>
        <div v-if="getReacts(getOne.id) != null" >
            <p>Disikes : {{getReacts(getOne.id)['emotes'][1]}}</p>
        </div>
        <button @click="react(getOne.id, 2)">Disike !</button>




    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {

    created() {
        this.getDetails(this.$route.params.id);
        this.viewMovie(this.$route.params.id);
        this.loadReacts(this.$route.params.id);
    },
    computed : {
        ...mapGetters('movies', ['getOne', 'getReacts']),
    },
    methods : {
        ...mapActions('movies', ['getDetails', 'viewMovie', 'loadReacts', 'addReaction']),
        react(movie_id, emote_id){
        this.addReaction({
            "movie_id": movie_id,
            "emote_id": emote_id
        });
        }
    }
}
</script>

<style stored>
    
</style>