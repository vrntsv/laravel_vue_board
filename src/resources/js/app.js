/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vuetify from "../plugins/vuetify";
import router from './routes';
import App from "./components/App";
import moment from 'moment'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from '../plugins/vuetify' // path to vuetify export
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setAuthUser(state, user) {
            state.user = user;
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.user !== null;
        }
    }
})
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.filter('truncate', function (text, stop, clamp) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM.DD.YYYY')
    }
})


Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBxuJt0FM7ceyYD6i5Y0XI_brWCTULYNd0',
        libraries: 'places', // This is required if you use the Autocomplete plugin
    },
    installComponents: true
})

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
