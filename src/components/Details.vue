<template>
    <div v-if="getOne != null" >
        <div class="col1">
            <h1> Details: </h1>  
            <div v-if="getWatched(getOne.id) != null">Watched: {{ getWatched(getOne.id)['watched'] }}</div>
            <button @click="callSetWatched">Watch/unwatch me !</button>
            <h1> Title: {{ getOne.title }}</h1>
            <h3> Genre: {{ getOne.genre.name }}</h3>
            <p>Views: {{getOne.views}}</p>
            <p>{{ getOne.description }}</p>
            <img :src="getOne.image_url" alt="Movie cover wallpaper">
            
            <div>
                <p>Likes : {{getOne.emotesCount.Like}}</p>
            </div>
            <button @click="react(getOne.id, 1)">Like !</button>
            <div>
                <p>Disikes : {{getOne.emotesCount.Dislike}}</p>
            </div>
            <button @click="react(getOne.id, 2)">Disike !</button>



            <app-comments/>
        </div>
        <div class="col2">
            <h1>Related: </h1>
            <app-popular :genre="getOne.genre_id" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {

    created() {
        this.getDetails(this.$route.params.id).then((res)=> {
            console.log(this.getOne);
        });
        this.loadReacts(this.$route.params.id);
        this.isWatched(this.$route.params.id);
    },
    computed : {
        ...mapGetters('movies', ['getOne', 'getReacts']),
        ...mapGetters('utils', ['getWatched'])
    },
    methods : {
        ...mapActions('movies', ['getDetails', 'viewMovie', 'loadReacts', 'addReaction']),
        ...mapActions('utils', ['isWatched', 'setWatched']),
        react(movie_id, emote_id){
            this.addReaction({ movie_id, emote_id });
        },
        callSetWatched(){
            this.setWatched(this.$route.params.id);
        }
    }
}
</script>

<style stored>
    .col1 {
        float: left;
        width: 70%;
    }
    .col2 {
        float: right;
        width: 30%;
    }
</style>