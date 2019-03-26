<template>
  <div class="people">
    <div class="table-responsive">
        <table class="table">
        <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>CPF</th>
          <th>Data Cadastro</th>
          <th>Permissão</th>
          <th colspan="2">Ação</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="personName of people" :key="personName['.key']">
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
            {{ personName.documents.cpf }}
          </td>
          <td class="text-center" v-else>
            <input class="input input-sm" type="text" v-model="personName.documents.cpf" placeholder="Nome"/>
          </td>
          <td class="text-center">
            {{ personName.data_cadastro }}
          </td>
          <td class="text-center">
            {{ personName.role == 1 ? "Administrador" : "Visitante"}}
          </td>
          <td class="text-center" v-if="!personName.edit">
            <div v-if="personName.role == 1">
              <a @click="setEditPerson(personName['.key'])" class="text-primary">
                <i class="glyphicon glyphicon-pencil"></i> Editar
              </a>
            </div>
          </td>
          <td class="text-center" v-else>
            <div v-if="personName.role == 1">
              <a @click="editPerson(personName)" class="text-primary">
                <i class="glyphicon glyphicon-pencil"></i> Salvar
              </a>
            </div>
          </td>
          <td class="text-center" v-if="!personName.edit">
            <div v-if="personName.role == 1">
              <a @click="removePerson(personName['.key'])" class="text-primary">
                <i class="glyphicon glyphicon-trash"></i> Excluir
              </a>
            </div>
          </td>
          <td class="text-center" v-else>
            <div v-if="personName.role == 1">
              <a @click="cancelEdit(personName['.key'])" class="text-primary">
                <i class="glyphicon glyphicon-trash"></i> Cancelar
              </a>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

    import {peopleRef, rolesRef} from "../firebase";

export default {
  name: 'People',
    data() {
        return {
            name: "",
            email: "",
            data_acesso: "",
            role: "",
            documents: {
                cpf: ""
            }
        };
    },
  firebase: {
    people: peopleRef,
    roles: rolesRef
  },
  methods: {
    removePerson: function(key){
        peopleRef.child(key).remove();
    },
    setEditPerson: function(key){
        peopleRef.child(key).update({
          edit: true
      });
    },
    cancelEdit: function(key){
        peopleRef.child(key).update({
          edit: false
      });
    },
    editPerson: function(person){
      const key = person['.key'];
        peopleRef.child(key).set({
          name: person.name,
          email: person.email,
          documents: {
              cpf: person.documents.cpf
          },
          role: person.role,
          data_cadastro: person.data_cadastro,
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