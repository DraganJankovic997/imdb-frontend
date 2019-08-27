<template>
    <div>
        <div v-for="p in getListOfTen" v-bind:key="p.id">
            <p @click="redirect(p.id)"> {{ p.title }}, {{p.views}} </p>
        </div>
        
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    props: ['genre'],
    created(){
        if(this.genre == 0) {
            this.loadPopular();
        } else {
            this.loadRelated(this.genre);
        }
    },
    methods: {
        ...mapActions('utils', ['loadPopular', 'loadRelated']),

        redirect($id){
            this.$router.push('/movies/' + $id);
            location.reload();
        }
    },
    computed: {
        ...mapGetters('utils', ['getListOfTen'])
    }
}
</script>

<style stored>
    
</style>