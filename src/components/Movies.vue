<template>
    <div>
        <div v-if="getPage(currentPage)!= null" class="col1">
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

                <router-link :to="`/movies/${m.id}`" ><h1>{{ m.title }}</h1></router-link>
                <div>Watched: {{ m.watched }}</div>
                <h4>{{ m.genre.name }}</h4>
                <p> Views: {{m.views}} </p>
                <p>{{ trim(m.description) }} </p>
                <img :src="m.image_url" alt="Movie wallpaper">

                <app-reacts :pbuttons="false"
                    :pemotesCount="m.emotesCount"
                    :pid="m.id" />


            </div>

                <button v-if="currentPage > 1" @click="prevPage()">Previous page</button>
                <b>{{ currentPage }}</b>
                <button v-if="currentPage < getLastPage" @click="nextPage()">Next page</button>
        </div>


        <div class="col2">
            <h1>Popular: </h1>
            <app-popular :genre="0" />
        </div>

   </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data () {
        return {
            currentPage: 0,
            search: '',
            displayGenre: '',
            genreFilter: false,
        }
    },
    created () {
        this.currentPage = 1;
        this.loadPage(this.currentPage)
        .then((res)=> {
            this.genres();
            // this.getWatchedPage(this.currentPage);

        }, (err) => {
            console.log(err.message);
        });
    },
    methods: {
        ...mapActions('movies', ['getFirstPage', 'loadPage', 'genres']),
        ...mapActions('utils', ['getWatchedPage']),
        trim (text) {
            return this.lodash.truncate(text, {
                'length': 50,
            });
        },
        nextPage(){
            this.currentPage = this.currentPage + 1;
            this.loadPage(this.currentPage)
            .then(()=> {
                this.getWatchedPage(this.currentPage);
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
        ...mapGetters('movies', ['getPage', 'getAll', 'getGenres', 'getLastPage']),
        ...mapGetters('utils', ['getWatched']),
        filteredMovies: function () {
            
            return this.getPage(this.currentPage).filter((movie) => {
                if(this.displayGenre == 0 || movie.genre_id == this.displayGenre){
                    return movie.title.toLowerCase().match(this.search.toLowerCase());
                } else {
                    return false;
                }
            });                
            
            
            

        }
    }
}
</script>

<style stored>
    b {
        margin-right: 20px;
        margin-left: 20px;
    }

    .col1 {
        float: left;
        width: 70%;
    }
    .col2 {
        float: right;
        width: 30%;
    }
</style>