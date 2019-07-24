'use strict';

import EventBus from './EventBus';
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import {loadProgressBar} from 'axios-progress-bar';
import VueFlashMessage from 'vue-flash-message';

import 'axios-progress-bar/dist/nprogress.css';
import 'vue-flash-message/dist/vue-flash-message.min.css';

import IndexView from './components/IndexView.vue';
import SearchView from './components/SearchView.vue';
import ProfileView from './components/ProfileView.vue';
import LoginView from './components/LoginView.vue';
import SignupView from './components/SignupView.vue';

Vue.use(VueAxios, axios);

Vue.use(VueRouter);

Vue.use(VueFlashMessage, {messageOptions: {timeout: 3000}});

loadProgressBar();

// Define base url to use for development
// const baseURL = 'http://localhost:3000';
// if (typeof baseURL !== 'undefined') {
//   Vue.axios.defaults.baseURL = baseURL;
// }

const routes = [
  {
    name: 'index',
    path: '/',
    component: IndexView
  },
  {
    name: 'search',
    path: '/search',
    component: SearchView
  },
  {
    name: 'profile',
    path: '/profile',
    component: ProfileView
  },
  {
    name: 'login',
    path: '/login',
    component: LoginView
  },
  {
    name: 'signup',
    path: '/signup',
    component: SignupView
  }
];
const router = new VueRouter({ mode: 'history', routes: routes });

Vue.config.productionTip = false;

Vue.prototype.$bus = EventBus;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
