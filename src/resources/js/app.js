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
import store from './store'
import Vuex from 'vuex'

Vue.use(Vuex)

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
