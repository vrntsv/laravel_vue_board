import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "./components/App";
import Posts from "./components/Posts";
import CreateAdvertisement from "./components/CreateAdvertisement";
import PostInfo from "./components/PostInfo";
import Auth from "./components/Auth";
import Logout from "./components/Logout";
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Posts
        },
        {
            path: '/posts/:id',
            name: 'postInfo',
            component: PostInfo
        },
        {
            path: '/create',
            name: 'createAdvertisement',
            component: CreateAdvertisement
        },
        {
            path: '/login',
            name: 'Auth',
            component: Auth
        },
        {
            path: '/logout',
            name: 'Logout',
            component: Logout
        }
    ],
});

export default router
