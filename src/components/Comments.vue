<template>
    <div>
        <h1>Comments : </h1>

        <div v-for="c in getComments" v-bind:key="c.id">
            <h4>Author: {{ c.author }}</h4>
            <p> {{ c.content }} </p>

        </div>

        <button v-if="currentPage < getLastPage" @click="showMore">Show more !</button>

        <p>New comment: <textarea v-model="newComment"
                rows="4" cols="50"></textarea></p>
        <button @click="addComment">Post new comment !</button>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data () {
        return {
            newComment: '',
            currentPage: 0,
        }
    },
    created() {
        this.currentPage = 1;
        this.loadComments({'movie_id': this.$route.params.id, 'page': this.currentPage});
    },
    computed: {
        ...mapGetters('comments', ['getComments', 'getLastPage']),
    },

    methods : {
        ...mapActions('comments', ['loadComments', 'postComment']),

        showMore(){
            this.currentPage = this.currentPage + 1;
            this.loadComments({movie_id: this.$route.params.id, page: this.currentPage});
        },
        addComment(){
            this.postComment({'movie_id': this.$route.params.id , 'content': this.newComment })
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style stored >
    
</style>