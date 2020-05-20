import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        currentUser: null,
        isLoggedIn: false,
        token: null,
        loading: false,
        auth_error: null,
        reg_error: null,
        registeredUser: null,
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedin(state) {
            return state.isLoggedin;
        },
        currentUser(state) {
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
            state.isLoggedin = true;
            state.loading = false;
            state.token = token;
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const body = {
            };
            console.log(config);
            axios.post('/api/auth/me', body, config)
                .then(function (response) {
                    console.log(response);
                    state.currentUser = response;
                }).catch(error => console.log(error));
            localStorage.setItem('user', JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem('user');
            state.isLoggedin = false;
            state.currentUser = null;
        },
        registerSuccess(state, payload) {
            state.reg_error = null;
            state.registeredUser = payload.user;
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

