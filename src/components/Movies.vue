<template>
    <div>
        
        <h1>Movies: </h1>
        <h1>Search: <input type="text" v-model="search"></h1>
        <h1>Genre: 
            <select v-model="displayGenre">
                <option value="0">All genres</option>
                <option v-for="g in getGenres" :key="g.id" 
                v-bind:value="g.id">{{ g.name }}</option>
            </select>
        </h1>
        <br><br><br>
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

            <button v-if="currentPage > 1" @click="prevPage()">Previous page</button>
            <b>{{ currentPage }}</b>
            <button v-if="currentPage < getLastPage" @click="nextPage()">Next page</button>

   </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data () {
        return {
            currentPage: 0,
            search: '',
            go: false,
            displayGenre: '',
            genreFilter: false,
        }
    },
    created () {
        this.currentPage = 1;
        this.loadPage(this.currentPage)
        .then((res)=> {
            this.getPage(this.currentPage).forEach(element => {
                this.loadReacts(element['id']);
            });
            this.genres();
            this.go = true;
        }, (err) => {
            console.log(err.message);
        });
    },
    methods: {
        ...mapActions('movies', ['getFirstPage', 'loadPage', 'loadReacts', 'genres']),
        trim (text) {
            return this.lodash.truncate(text, {
                'length': 50,
            });
        },
        nextPage(){
            this.go = false;
            this.currentPage = this.currentPage + 1;
            this.loadPage(this.currentPage)
            .then(()=> {
                this.getPage(this.currentPage).forEach(element => {
                    this.loadReacts(element['id']);
                });
                this.go = true;
            })
            .catch((err) => {
                console.log(err);
            });
        },
        prevPage(){
            this.currentPage = this.currentPage - 1;
        }

    },
    computed: {
        ...mapGetters('movies', ['getPage', 'getAll', 'getReacts', 'getGenres', 'getLastPage']),
        filteredMovies: function () {
            if(this.go) {
                return this.getPage(this.currentPage).filter((movie) => {
                    if(this.displayGenre == 0 || movie.genre_id == this.displayGenre){
                        return movie.title.toLowerCase().match(this.search.toLowerCase());
                    } else {
                        return false;
                    }
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