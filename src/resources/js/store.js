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
        registeredUser: null,
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
            state.isLoggedIn = true;
            state.loading = false;
            state.token = token;
            console.log(state.token);
            console.log(state.isLoggedin);
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
            if (state.token) {
                console.log('----------')
                console.log(state.isLoggedin)
                console.log('----------')
                const config = {
                    headers: {Authorization: `Bearer ${state.token}`}
                };
                const body = {};
                axios.post('/api/auth/logout', body, config)
                localStorage.removeItem('user');
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

