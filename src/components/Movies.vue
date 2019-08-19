<template>
    <div>
        
        <h1>Movies: </h1>

        <div v-for="m in getPage(currentPage)" :key="m.id">

            <router-link :to="'/movies/'+m.id" >{{ m.title }}</router-link>
            <h5>{{ m.genre_id }}</h5>
            <p>{{ trim(m.description) }} </p>
            <img :src="m.image_url" alt="Movie wallpaper">

        </div>


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
            var arr = text.trim();
	        arr = arr.split(' ').slice(0, 20);
            text = arr.join(' ') + '...';
            return text;
        },
        nextPage(){
            this.currentPage = this.currentPage + 1;
            this.loadPage(this.currentPage)
            .then(()=> {
            })
            .catch((err) => {
                console.log(err);
            })
        }

    },
    computed: {
        ...mapGetters('movies', ['getPage', 'getAll']),
        
    }
}
</script>

<style stored>
    
</style>