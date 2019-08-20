<template>
    <div>
        
        <h1>Movies: </h1>

        <div v-for="m in getPage(currentPage)" :key="m.id">

            <router-link :to="'/movies/'+m.id" ><h1>{{ m.title }}</h1></router-link>
            <h4>{{ m.genre.name }}</h4>
            <p> Views: {{m.views}} </p>
            <p>{{ trim(m.description) }} </p>
            <img :src="m.image_url" alt="Movie wallpaper">

            <div v-for="r in getReacts(m.id)" v-bind:key="r.name">
                <h3> {{r.name}}  =>  {{r.reaction_count}}  </h3>
            </div>


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
            this.getPage(this.currentPage).forEach(element => {
                this.loadReacts(element['id']);
            });
        }, (err) => {
            console.log(err.message);
        });
    },
    methods: {
        ...mapActions('movies', ['getFirstPage', 'loadPage', 'loadReacts']),
        trim (text) {
            return this.lodash.truncate(text, {
                'length': 50,
            });
        },
        nextPage(){
            this.currentPage = this.currentPage + 1;
            this.loadPage(this.currentPage)
            .then(()=> {
                this.getPage(this.currentPage).forEach(element => {
                    this.loadReacts(element['id']);
                });
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
        ...mapGetters('movies', ['getPage', 'getAll', 'getReacts']),
        
    }
}
</script>

<style stored>
b {
    margin-right: 20px;
    margin-left: 20px;
}
</style>