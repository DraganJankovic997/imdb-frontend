<template>
    <div>
        <p>New comment: <textarea v-model="newComment"
            rows="4" cols="50"></textarea></p>
        <button @click="addComment">Post new comment !</button>

    </div>
</template>

<script>
export default {
    props: ['propType', 'propId'] ,
    data(){
        return {
            newComment: ''
        }
    },
    methods: {
        addComment(){
            this.$emit('addCommentEvent', this.newComment);
        }
    }
}
</script>

<style>

</style>