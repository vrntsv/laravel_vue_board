import Vue from 'vue'
import VueRouter from 'vue-router'
import App from "./components/App";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'app',
        component: App
    },

]

const router = new VueRouter({
        mode: 'history',
        routes
    }
)

export default router
