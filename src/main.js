import Vue from 'vue';
import firebase from 'firebase';
import './firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let config = '';

firebase.auth().onAuthStateChanged(() => {
  if (!config) {
    /* eslint-disable no-new */
    config = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});