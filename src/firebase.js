import { initializeApp } from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyCK-903991KAuslNgm8N9z82ljFK7IQzkc",
    authDomain: "fir-vue-f76e2.firebaseapp.com",
    databaseURL: "https://fir-vue-f76e2.firebaseio.com",
    projectId: "fir-vue-f76e2",
    storageBucket: "",
    messagingSenderId: "683328319983"
});

export const db = app.database();
// export const storage = app.storage();

export const peopleRef = db.ref('people');
export const rolesRef = db.ref('roles');
// export const storageRef = storage.ref();