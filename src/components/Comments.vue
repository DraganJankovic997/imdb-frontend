<template>
    <div v-if="propComments != null">
        <div v-for="c in propComments" v-bind:key="c.id">
            <h4 v-if="c.user != null">Author: {{ c.user.name }}</h4>
            <p> {{ c.content }} </p>
            <div v-if="!propIsSubcomment && c.subcomments != null">
                <u> Subcomments: </u> 
                <app-comments @AddSubcomment="addComment($event)" @UpdateComments="loadMovieComments($event)"
                :propComments="c.subcomments" :propIsSubcomment="true"
                :propId="c.id"/>
            </div>
            
            <div v-if="!propIsSubcomment" >
                ____________________________________________________
            </div>


        </div>

        <button v-if="currentPage < propLastPage" @click="showMore">Show more !</button>

        <p>New comment: <textarea v-model="newComment"
            rows="4" cols="50"></textarea></p>
        <button @click="buttonClick">Post new comment !</button>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    props: {
        propLastPage: Number,
        propComments: Array,
        propIsSubcomment: Boolean,
        propId: Number
    },
    data () {
        return {
            currentPage: 0,
            newComment: ''
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
        buttonClick(){
            var data = {
                content: this.newComment,
                isSubcomment: this.propIsSubcomment,
                id: this.propId
            };
            if(this.propIsSubcomment){
                this.addSubcomment(data);
            } else {
                this.addComment(data);
            }
        },
        addComment(data) {
            this.currentPage = this.propLastPage;
            this.$emit('AddComment', data);
        },
        addSubcomment(data) {
            this.currentPage = this.propLastPage;
            this.$emit('AddSubcomment', data);
        },
        loadComments(){
            this.$emit('UpdateComments', this.currentPage);
        }
    }
}
</script>

<style stored >
    
</style>