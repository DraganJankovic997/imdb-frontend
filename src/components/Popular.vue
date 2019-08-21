<template>
    <div>
        <h1>Popular: </h1>
        <div v-for="p in getPopular" v-bind:key="p.id">
            <p> {{ p.title }} , {{p.views}}   <button @click="redirect(p.id)" >Go to !</button> </p>
        </div>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    
    created(){
        this.loadPopular();
    },
    methods: {
        ...mapActions('utils', ['loadPopular']),

        redirect($id){
            this.$router.push('/movies/' + $id);
        }
    },
    computed: {
        ...mapGetters('utils', ['getPopular'])
    }
}
</script>

<style stored>
    
</style>