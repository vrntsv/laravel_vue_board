<template>
<div>
    <v-navigation-drawer absolute temporary v-model="drawer" class="hidden-md-and-up">
        <v-list >
            <v-list-item @click="$router.push(item.route)" v-for="(item, i) in menuItems" text :key="`navDrawer${i}`">
                <v-list-item-action>
                    <v-icon  v-html="item.icon"/>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title  v-text="item.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <v-app-bar dark app>
        <v-app-bar-side-icon @click="drawer = !drawer" class="hidden-md-and-up">
            <v-icon >more_vert</v-icon>
        </v-app-bar-side-icon>
        <v-toolbar-title>Advertisement board</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-for="(item, i) in menuItems" flat :key="`menuItem${i}`" :to="item.route">
                <v-icon left v-html="item.icon"></v-icon>
                <div >{{item.title}}</div>
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
</div>
</template>

<script>
    export default {
        data(){
            return {
                drawer: false
            }
        },
        computed: {
            menuItems(){
                return[
                    {
                        icon: 'home',
                        title: 'Home',
                        route: '/'
                    },
                    {
                        icon: 'done_all',
                        title: 'Login',
                        route: '/login'
                    },
                    {
                        icon: 'account_circle',
                        title: 'register',
                        route: '/register'
                    },
                    {

                        icon: 'create',
                        title: 'Create Advertisement',
                        route: '/create'
                    },
                    {
                        icon: 'exit_to_app',
                        title: 'Logout',
                        route: '/logout'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
