import firebase from 'firebase'
import Vue from 'vue'
import Router from 'vue-router'

import VueFire from 'vuefire'

import BootstrapVue from 'bootstrap-vue'
import BModal from 'bootstrap-vue/es/components/modal/modal'
import BModalDirective from 'bootstrap-vue/es/directives/modal/modal'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Home from '@/views/Home'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import {peopleRef} from "./firebase"

Vue.use(Router);
Vue.use(VueFire);
Vue.use(BootstrapVue);

Vue.component('b-modal', BModal);
Vue.directive('b-modal', BModalDirective);

const router = new Router({
  routes: [
    { path: '*', redirect: '/login' },
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'Login', component: Login },
    { path: '/sign-up', name: 'SignUp', component: SignUp },
    { path: '/home', name: 'Home', component: Home, firebase: { names: peopleRef }, meta: { requiresAuth: true } }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
