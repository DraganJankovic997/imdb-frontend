<template>
    <div >

        <h1>Movies: </h1>
        <h1>Search: <input type="text" v-model="search"></h1>
        <h1>Genre: 
            <select v-model="displayGenre">
                <option value="0">All genres</option>
                <option v-for="genre in getGenres" :key="genre.id" 
                    v-bind:value="genre.id">{{ genre.name }}</option>
            </select>
        </h1>
        <br><br><br>



        <div class="row">
            <div v-if="getPage(currentPage)!= null" class="col1">
                <div v-for="m in getPage(currentPage)" :key="m.id">

                    <app-movie :movie="m" :details="false"/>

                    <app-reacts :pbuttons="false"
                        :pemotesCount="m.emotes"
                        :pid="m.id" />

                </div>
            </div>

            <div class="col2">
                <h1>Popular: </h1>
                <app-popular :genre="0" />
            </div>
        </div>



        <div style="margin-bottom: 100px; margin-top: 50px;">
            <button v-if="currentPage > 1" @click="prevPage()">Previous page</button>
            <b>{{ currentPage }}</b>
            <button v-if="currentPage < getLastPage" @click="nextPage()">Next page</button>
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

        }, (err) => {
            console.log(err.message);
        });
    },
    methods: {
        ...mapActions('movies', ['getFirstPage', 'loadPage', 'genres']),
        trim (text) {
            return this.lodash.truncate(text, {
                'length': 50,
            });
        },
        nextPage(){
            this.currentPage = this.currentPage + 1;
            this.loadPage(this.currentPage)
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
        filteredMovies() {
            
            return this.getPage(this.currentPage).filter((movie) => {
                if(this.displayGenre == 0 || movie.genre_id == this.displayGenre){
                    return movie.title.toLowerCase().match(this.search.toLowerCase());
                }
                return false;
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
    .row:after {
        content: "";
        display: table;
        clear: both;
    }
</style>