import Vue from 'vue';
import Vuex from 'vuex';
import router from "./routes";

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        currentUser: null,
        isLoggedIn: false,
        token: null,
        loading: false,
        auth_error: null,
        reg_error: null,
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        getToken(state) {
            return state.token;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        getCurrentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        regError(state) {
            return state.reg_error;
        },
        registeredUser(state) {
            return state.registeredUser;
        },
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, token) {

            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.token = token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const body = {
            };
            axios.post('/api/auth/me', body, config)
                .then(function (response) {

                    state.currentUser = response.data;
                }).catch(error => console.log(error));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            if (state.token) {
                const config = {
                    headers: {Authorization: `Bearer ${state.token}`}
                };
                const body = {};
                axios.post('/api/auth/logout', body, config)
                state.isLoggedIn = false;
                state.currentUser = null;
                router.push('/')

            } else {
                state.isLoggedin = false;
                state.currentUser = null;
                router.push('/')

            }
        },
        registerSuccess(state, payload) {
            state.isLoggedIn = true;
            state.reg_error = null;
            state.currentUser = payload.data.user;
            state.token = payload.data.token;
        },
        registerFailed(state, payload) {
            state.reg_error = payload.error;
        },
    },
    actions: {
        login(context) {
            context.commit('login');
        }
    }
})

export default store

