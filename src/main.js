import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

let app = '';
const config = {
  apiKey: "AIzaSyCK-903991KAuslNgm8N9z82ljFK7IQzkc",
  authDomain: "fir-vue-f76e2.firebaseapp.com",
  databaseURL: "https://fir-vue-f76e2.firebaseio.com",
  projectId: "fir-vue-f76e2",
  storageBucket: "",
  messagingSenderId: "683328319983"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

export const namesRef = firebase.database().ref('names');