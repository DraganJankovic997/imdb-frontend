<template>
    <div>

        <div v-for="(value, key) in pemotesCount" :key="key">
            {{key}} :  {{value}}
            <button class="mini" v-if="pbuttons" @click="react(key)">{{key}}</button>
            <br>
        </div>       
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    props: {
        pemotesCount: Object,
        pbuttons: Boolean,
        pid: Number
    },
    methods: {
        react(emote_name){
            this.$emit('passReaction', emote_name);
        }
    }
}
</script>

<style stored>
    .mini {
        height: 30px;
        width: 70px;
        margin-left: 20px;
        margin-top: 10px;
    }
</style>