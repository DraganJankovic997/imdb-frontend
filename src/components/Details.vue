<template>
    <div v-if="getOne != null">
        <h1> Details: </h1>
        <h1> Title: {{ getOne.title }}</h1>
        <h3> Genre: {{ getOne.genre.name }}</h3>
        <p>Views: {{getOne.views}}</p>
        <p>{{ getOne.description }}</p>
        <img :src="getOne.image_url" alt="Movie cover wallpaper">
        <div v-for="r in getReacts(getOne.id)" v-bind:key="r.name">
            <h3> {{r.name}}  =>  {{r.reaction_count}}  </h3>
        </div>
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
        ...mapActions('movies', ['getDetails', 'viewMovie', 'loadReacts'])
    }
}
</script>

<style stored>
    
</style>