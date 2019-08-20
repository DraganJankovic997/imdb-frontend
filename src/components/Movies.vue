<template>
    <div>
        
        <h1>Movies: </h1>
        <h1>Search: <input type="text" v-model="search"></h1>
        <div v-for="m in filteredMovies" :key="m.id">

            <router-link :to="'/movies/'+m.id" ><h1>{{ m.title }}</h1></router-link>
            <h4>{{ m.genre.name }}</h4>
            <p> Views: {{m.views}} </p>
            <p>{{ trim(m.description) }} </p>
            <img :src="m.image_url" alt="Movie wallpaper">

            <div v-if="getReacts(m.id) != null" >
                <p>Likes : {{getReacts(m.id)['emotes'][0]}}</p>
                <p>Disikes : {{getReacts(m.id)['emotes'][1]}}</p>
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
            search: '',
            go: false
        }
    },
    created () {
        this.currentPage = 1;
        this.loadPage(this.currentPage)
        .then((res)=> {
            this.getPage(this.currentPage).forEach(element => {
                this.loadReacts(element['id']);
            });
            this.go = true;
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
        filteredMovies: function () {
            if(this.go) {
                return this.getPage(this.currentPage).filter((movie) => {
                    return movie.title.toLowerCase().match(this.search.toLowerCase());
                });
            } else {
                return this.getPage(this.currentPage);
            }

        }
    }
}
</script>

<style stored>
b {
    margin-right: 20px;
    margin-left: 20px;
}
</style>