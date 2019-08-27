<template>
    <div>
        <h1>Comments : </h1>

        <div v-for="c in propComments" v-bind:key="c.id">
            <h4>Author: {{ c.user.name }}</h4>
            <p> {{ c.content }} </p>

        </div>

        <button v-if="currentPage < propLastPage" @click="showMore">Show more !</button>

        <p>New comment: <textarea v-model="newComment"
                rows="4" cols="50"></textarea></p>
        <button @click="addComment">Post new comment !</button>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['propLastPage', 'propComments'],
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

    methods : {
        showMore(){
            this.currentPage = this.currentPage + 1;
            this.loadComments();
        },
        addComment(){
            this.$emit('AddComment', this.newComment)
        },
        loadComments(){
            this.$emit('UpdateComments', this.currentPage);
        }
    }
}
</script>

<style stored >
    
</style>