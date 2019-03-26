<template>
  <div class="people">
    <div class="table-responsive">
        <table class="table">
        <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>CPF</th>
          <th>Data de Acesso</th>
          <th colspan="2">Ação</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="personName of names" :key="personName['.key']">
          <td class="text-center" v-if="!personName.edit">
            {{ personName.name }}
          </td>
          <td class="text-center" v-else>
            <input class="input input-sm" type="text" v-model="personName.name" placeholder="Nome"/>
          </td>
          <td class="text-center" v-if="!personName.edit">
            {{ personName.email }}
          </td>
          <td class="text-center" v-else>
            <input class="input input-sm" type="text" v-model="personName.email" placeholder="Nome"/>
          </td>
          <td class="text-center" v-if="!personName.edit">
            {{ personName.cpf }}
          </td>
          <td class="text-center" v-else>
            <input class="input input-sm" type="text" v-model="personName.cpf" placeholder="Nome"/>
          </td>
          <td class="text-center">{{ personName.data_acesso }}</td>
          <td class="text-center" v-if="!personName.edit">
            <a @click="setEditPerson(personName['.key'])" class="text-primary">
              <i class="glyphicon glyphicon-pencil"></i> Editar
            </a>
          </td>
          <td class="text-center" v-else>
            <a @click="editPerson(personName['.key'])" class="text-primary">
              <i class="glyphicon glyphicon-pencil"></i> Salvar
            </a>
          </td>
          <td class="text-center" v-if="!personName.edit">
            <a @click="removePerson(personName['.key'])" class="text-primary">
              <i class="glyphicon glyphicon-trash"></i> Excluir
            </a>
          </td>
          <td class="text-center" v-else>
            <a @click="cancelEdit(personName['.key'])" class="text-primary">
              <i class="glyphicon glyphicon-trash"></i> Cancelar
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

import {namesRef} from "../firebase";

export default {
  name: 'People',
    data() {
        return {
            name: "",
            email: "",
            cpf: "",
            data_acesso: ""
        };
    },
  firebase: {
    names: namesRef
  },
  methods: {

    removePerson: function(key){
      namesRef.child(key).remove();
    },
    setEditPerson: function(key){
      namesRef.child(key).update({
          edit: true
      });
    },
    cancelEdit: function(key){
      namesRef.child(key).update({
          edit: false
      });
    },
    editPerson: function(person){
      const key = person['.key'];
      namesRef.child(key).set({
          name: person.name,
          email: person.email,
          cpf: person.cpf,
          edit: false
      });
    },
  }
}

</script>

<style scoped>
    a {
        cursor: pointer;
    }
</style>