<template>
  <div class="home">
    <div class="people">
      <h1>Lista de Pessoas</h1>
      <div>
        <label><strong>Nome:</strong></label><br>
        <input type="text" v-model="name" />
        <button @click="submitName()" class="add">Adicionar</button>
      </div>
      <div>
        <ul>
          <li v-for="personName of names" :key="personName['.key']">
            <div v-if="!personName.edit">
              <p>{{ personName.name }}</p>
              <button @click="setEditPerson(personName['.key'])">Editar</button>
              <button @click="removePerson(personName['.key'])">Excluir</button>
            </div>
            <div v-else>
              <input type="text" v-model="personName.name">
              <button @click="editPerson(personName)">Salvar</button>
              <button @click="cancelEdit(personName['.key'])">Cancelar</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <button @click="logout">Sair</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import {namesRef} from "../firebase";

export default {
  name: 'people',
  data () {
    return {
      name: ''
    }
  },
  firebase: {
    names: namesRef
  },
  methods: {
    submitName: function(){
      namesRef.push({ name: this.name, edit: false });
      this.name = '';
    },
    removePerson: function(key){
      namesRef.child(key).remove();
    },
    setEditPerson: function(key){
      namesRef.child(key).update({ edit: true });
    },
    cancelEdit: function(key){
      namesRef.child(key).update({ edit: false });
    },
    editPerson: function(person){
      const key = person['.key'];
      namesRef.child(key).set({ name: person.name, edit: false });
    },
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}

</script>
