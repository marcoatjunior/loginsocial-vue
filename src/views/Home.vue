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
          <Register/>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-12">
          <People/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import firebase from "firebase";
import People from "@/components/People.vue";
import Register from "@/components/Register.vue";

export default {
  name: "home",
  components: {
    People,
    Register
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          localStorage.clear();
          this.$router.replace("login");
        });
    }
  }
};
</script>
