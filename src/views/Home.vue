<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <p>Deseja sair? <a @click="logout" class="text-primary">Logout</a></p>
        </div>
      </div>
        <div class="row">
          <div class="col-md-10 col-sm-12">
            <h4 class="text-left">Lista de Pessoas</h4>
          </div>
          <div class="col-md-2 col-sm-12">
            <button class="btn btn-primary pull-right" v-b-modal>Cadastrar nova</button>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table">
                <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>CPF</th>
                  <th>Data de Acesso</th>
                  <th>Permissão</th>
                  <th colspan="2">Ação</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="personName of names" :key="personName['.key']">
                  <td class="text-center">{{ personName.name }}</td>
                  <td class="text-center">-</td>
                  <td class="text-center">-</td>
                  <td class="text-center">-</td>
                  <td class="text-center">
                    <a @click="setEditPerson(personName['.key'])" class="text-primary">
                      <i class="glyphicon glyphicon-pencil"></i> Editar
                    </a>
                  </td>
                  <td class="text-center">
                    <a @click="cancelEdit(personName['.key'])" class="text-primary">
                      <i class="glyphicon glyphicon-trash"></i> Excluir
                    </a>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!--Cadastro-->
            <!--<input type="text" v-model="name" placeholder="Nome"/>-->
            <!--Edição-->
            <!--<td v-if="!personName.edit">{{ personName.name }}</td>-->
            <!--<td v-else>-->
              <!--<input type="text" v-model="personName.name"/>-->
            <!--</td>-->
            <!--<td v-if="!personName.edit">
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
            </td>-->
          </div>
          <div class="modal-footer">
            <button @click="submitName()" class="add">Adicionar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>
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
        localStorage.clear();
        this.$router.replace('login');
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
    cursor: pointer;
  }
</style>