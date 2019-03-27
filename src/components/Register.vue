<template>
  <div class="register">
    <b-button class="btn btn-primary pull-right" v-b-modal.cadastrar>Cadastrar</b-button>
    <b-modal id="cadastrar" hide-footer title="Cadastrar">
      <form method="post">
        <div class="row" v-if="errors.length">
          <div class="col s12">
            <label class="text-danger">
              <strong>Por favor, corrija o(s) seguinte(s) erro(s):</strong>
            </label>
            <br>
            <p v-for="error in errors" :key="errors[error]" class="text-danger">{{ error }}</p>
            <br>
          </div>
        </div>
        <div class="row">
          <div class="col s12">
            <input id="name" class="input-sm col s12" type="text" v-model="name" placeholder="Nome" />
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col s12">
            <input id="email" class="input-sm col s12" type="email" v-model="email" placeholder="E-mail" />
            <br>
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col s12">
            <input id="cpf" class="input-sm col s12" type="text" v-model="documents.cpf" placeholder="CPF" />
          </div>
        </div>
        <br>
        <div class="row">
          <div class="col s12">
            <b-button type="submit" class="btn btn-primary pull-right" @click="addPerson" >Cadastrar</b-button>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
  import {peopleRef, rolesRef} from "../firebase";

export default {
  name: "Register",
  data() {
    return {
      errors: [],
      name: "",
      email: "",
      created_at: "",
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
    checkForm: function () {
      if (this.name && this.email && this.documents.cpf) {

        /*var message = 'Teste Storage';
        storageRef.putString(message).then(function() {
          console.log('Uploaded a raw string!');
        });*/

        for (var [key, object] of Object.entries(this.people)) {
          if (object.email == this.email) {
            this.errors = [];
            this.errors.push('O endereço de e-mail informado já existe.');
            return false;
          }
        }
        return true;
      }

      this.errors = [];

      if (!this.name) {
        this.errors.push('O nome é obrigatório.');
      }

      if (!this.email) {
        this.errors.push('O e-mail é obrigatório.');
      }

      if (!this.cpf) {
        this.errors.push('O CPF é obrigatório.');
      }

      return false;
    },
    addPerson: function(e) {

      e.preventDefault();

      if (this.checkForm()) {
        let data = new Date(),
                dia = data.getDate().toString(),
                diaF = dia.length == 1 ? "0" + dia : dia,
                mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                mesF = mes.length == 1 ? "0" + mes : mes,
                anoF = data.getFullYear();

        peopleRef.push({
          name: this.name,
          email: this.email,
          documents: {
            cpf: this.documents.cpf
          },
          created_at: diaF + "/" + mesF + "/" + anoF,
          role: this.roles[1]['.value'],
          edit: false
        });

        this.name = "";
        this.email = "";
        this.documents.cpf = "";
        this.created_at = "";
        this.role = "";

        this.$emit('hide');
      }
    }
  }
};
</script>

<style scoped>
  p {
    margin: 0;
  }
</style>
