<template>
    <div>
        <div v-for="c in propComments" v-bind:key="c.id">
            <h4>Author: {{ c.user.name }}</h4>
            <p> {{ c.content }} </p>
            <div v-if="propIsSubcomment && c.subcomments.length>0">
                Subcomments: 
                <app-comments @AddComment="addMovieComment($event)" @UpdateComments="loadMovieComments($event)"
                :propComments="c.subcomments" :propIsSubcomment="false"/>
            </div>
            
            <div v-if="propIsSubcomment" >
                ____________________________________________________
            </div>


        </div>

        <button v-if="currentPage < propLastPage" @click="showMore">Show more !</button>

        <app-comment-input @addCommentEvent="addComment($event)" />

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: ['propLastPage', 'propComments', 'propIsSubcomment'],
    data () {
        return {
            currentPage: 0,
        }
    },
    created() {
        this.currentPage = 1;
    },

    methods : {
        showMore(){
            this.currentPage = this.currentPage + 1;
            this.loadComments();
        },
        addComment($newComment){
            this.currentPage = this.propLastPage;
            let type = this.propIsSubcomment ? 'comment' : 'movie';
            this.$emit('AddComment', {content: this.newComment, type: type});
        },
        loadComments(){
            this.$emit('UpdateComments', this.currentPage);
        }
    }
}
</script>

<style stored >
    
</style>