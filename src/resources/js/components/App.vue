<template>
    <v-app>
        <app-header></app-header>
        <v-content>
            <router-view/>
        </v-content>
    </v-app>
</template>


<script>
    import AppHeader from './AppHeader.vue'
    export default {
        mounted() {
            this.$store.commit('setAuthUser', window.auth_user);
        },
        components:{
            AppHeader
        }
    }
</script>

<style scoped>

</style>
