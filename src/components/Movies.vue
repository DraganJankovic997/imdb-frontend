<template>
    <div>
        
        <h1>Movies: </h1>

        <div v-for="m in getPage(currentPage)" :key="m.id">

            <router-link :to="'/movies/'+m.id" ><h1>{{ m.title }}</h1></router-link>
            <h4>{{ m.genre.name }}</h4>
            <p> Views: {{m.views}} </p>
            <p>{{ trim(m.description) }} </p>
            <img :src="m.image_url" alt="Movie wallpaper">

        </div>

            <button @click="prevPage()">Previous page</button>
            <b>{{ currentPage }}</b>
            <button @click="nextPage()">Next page</button>

   </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data () {
        return {
            currentPage: null,
        }
    },
    created () {
        this.currentPage = 1;
        this.loadPage(this.currentPage)
        .then((res)=> {
        }, (err) => {
            console.log(err.message);
        });
    },
    methods: {
        ...mapActions('movies', ['getFirstPage', 'loadPage']),
        trim (text) {
            return this.lodash.truncate(text, {
                'length': 50,
            });
        },
        nextPage(){
            this.currentPage = this.currentPage + 1;
            this.loadPage(this.currentPage)
            .then(()=> {
            })
            .catch((err) => {
                console.log(err);
            })
        },
        prevPage(){
            this.currentPage = this.currentPage - 1;
        }

    },
    computed: {
        ...mapGetters('movies', ['getPage', 'getAll']),
        
    }
}
</script>

<style stored>
b {
    margin-right: 20px;
    margin-left: 20px;
}
</style>