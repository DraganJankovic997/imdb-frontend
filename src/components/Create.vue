<template>
    <div>
        <h1>Add manually: </h1>
        <p>Title: <input type="text" v-model="newMovie.title"></p>
        <p>Description: <textarea v-model="newMovie.description"
                rows="4" cols="50"></textarea></p>
        <p>Genre: 
            <select v-model="newMovie.genre_id">
                <option v-for="g in getGenres" :key="g.id" 
                v-bind:value="g.id">{{ g.name }}</option>
            </select>
        </p>
        <p>Image url: <input type="text" v-model="newMovie.image_url"></p>



        <button @click="callAddMovie">Add</button>

        <h1>Import from OMDB</h1>
        <p>Search: <input type="text" v-model="omdbSearch"></p>
        <button @click="callSearch()">Search</button>
        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data () {
        return {
            newMovie: {
                title: '',
                description: '',
                genre_id: '',
                image_url: '',
                // created_at: '',
                // updated_at: ''
            },
            omdbSearch: ''
        }
    },
    created(){
        this.genres()
        .catch((err)=>{
            console.log(err);
        })
    },
    methods: {
        ...mapActions('movies', ['genres', 'addMovie', 'search']),

        callAddMovie(){
            this.addMovie(this.newMovie)
            .then((res)=>{
                console.log(res);
                this.$router.push('/movies');
            })
            .catch((err) => {
                console.log(err);
            })
        },

        callSearch(){
            this.search(this.omdbSearch)
            .then((res) => {
                this.newMovie.title = res['data']['Title'];
                this.newMovie.description = res['data']['Plot'];
                this.newMovie.image_url = res['data']['Poster'];
                this.newMovie.genre_id = 1;  //hotfix kasnije :^)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    },
    computed: {
        ...mapGetters('movies', ['getGenres'])
    }
}
</script>

<style stored>
    .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    margin: 30px;
  }
</style>