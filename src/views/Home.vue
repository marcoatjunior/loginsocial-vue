<template>
  <div class="home">
    <div class="people">
      <h1>Lista de Pessoas</h1>
      <div>
        <input type="text" v-model="name" placeholder="Nome"/>
        <button @click="submitName()" class="add">Adicionar</button>
      </div>
      <div class="row">
          <table border="1">
            <thead>
            <tr>
              <th>Nome</th>
              <th>Permissão</th>
              <th colspan="2">Ação</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="personName of names" :key="personName['.key']">
              <td v-if="!personName.edit">{{ personName.name }}</td>
              <td v-else>
                <input type="text" v-model="personName.name"/>
              </td>
              <td>-</td>
              <td v-if="!personName.edit">
                <button @click="setEditPerson(personName['.key'])">Editar</button>
              </td>
              <td v-else>
                <button @click="editPerson(personName)">Salvar</button>
              </td>
              <td v-if="!personName.edit">
                <button @click="removePerson(personName['.key'])">Excluir</button>
              </td>
              <td v-else>
                <button @click="cancelEdit(personName['.key'])">Cancelar</button>
              </td>
            </tr>
            </tbody>
          </table>
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

<style scoped>
  .people {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .add {
    margin-left: 10px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>