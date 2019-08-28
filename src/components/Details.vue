<template>
    <div v-if="getOne != null" >
        <h1> Details: </h1>  
        <div class="col1">
            <app-movie :movie="getOne" @watched="callSetWatched" :details="true"/>
            <app-reacts :pbuttons="true"
                :pemotesCount="getOne.emotes"
                :pid="getOne.id"
                @passReaction="react($event)" />
            <h1>Comments : </h1>
            <app-comments @AddComment="addMovieComment($event)" @UpdateComments="loadMovieComments($event)"
                :propLastPage="getLastPage" :propComments="getComments"
                :propIsSubcomment="false" :propId="getOne.id"/>
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
        this.getDetails(this.$route.params.id)
        .then((res) => {
            this.loadComments({'movie_id': this.$route.params.id, 'page': 1});
        });
    },
    computed : {
        ...mapGetters('movies', ['getOne']),
        ...mapGetters('comments', ['getComments', 'getLastPage']),
    },
    methods : {
        ...mapActions('movies', ['getDetails', 'addReaction']),
        ...mapActions('utils', ['setWatched']),
        ...mapActions('comments', ['loadComments', 'postComment']),

        callSetWatched(){
            this.setWatched(this.$route.params.id);
        },
        react(emote_name){
            this.addReaction({ movie_id: this.$route.params.id, emote_name: emote_name });
        },
        addMovieComment(data) {
            console.log(data);
            this.postComment(data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        },
        loadMovieComments(commentsPage){
            this.loadComments({movie_id: this.$route.params.id, page: commentsPage})
            .catch((err) => {
                console.log(err);
            });
        },
        loadAllComments() {
            this.loadAllComments(movie_id);
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