<template>
  <div class="register">
    <b-button class="btn btn-primary pull-right" v-b-modal.cadastrar>Cadastrar nova</b-button>
    <b-modal id="cadastrar" hide-footer title="Cadastrar">
      <div class="row">
        <div class="col s12">
          <input class="input-sm" type="text" v-model="name" placeholder="Nome" />
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <input class="input-sm" type="email" v-model="email" placeholder="E-mail" />
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <input class="input-sm" type="text" v-model="cpf" placeholder="CPF" />
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <b-button class="btn btn-primary pull-right" @click="addPerson" >Cadastrar</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { namesRef } from "../firebase";

export default {
  name: "Register",
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
    addPerson: function() {
      let data = new Date(),
        dia = data.getDate().toString(),
        diaF = dia.length == 1 ? "0" + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = mes.length == 1 ? "0" + mes : mes,
        anoF = data.getFullYear();

      namesRef.push({
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        data_cadastro: diaF + "/" + mesF + "/" + anoF,
        edit: false
      });

      this.name = "";
      this.email = "";
      this.cpf = "";

      this.$emit('hide');
    }
  }
};
</script>
