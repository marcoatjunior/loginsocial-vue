<template>
  <div class="sign-up">
      <div class="row">
          <div class="col-md-12">
              <h3>Cadastre-se no formulário abaixo</h3>
              <input type="text" v-model="email" placeholder="E-mail"><br>
              <input type="password" v-model="password" placeholder="Senha"><br>
              <button @click="signUp" class="btn btn-primary">Cadastrar</button>
              <br>
              <p><router-link to="/login">Voltar a tela inicial</router-link></p>
          </div>
      </div>
  </div>
</template>

 <script>
  import firebase from 'firebase';

  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
              for (var [key, value] of Object.entries(user.credential)) {
                  localStorage.setItem(key, value);
              }
            this.$router.replace('home')
          },
          (err) => {
              console.log(err.message);
              alert('Ocorreu um erro ao efetuar o cadastro. Por favor, tente novamente.');
          }
        );
      }
    }
  }
</script>

 <style scoped>
  .sign-up {
    margin-top: 20px;
  }
  input {
      margin: 10px 0;
      width: 25%;
      padding: 15px;
  }
  button {
      margin-top: 20px;
      width: 15%;
      cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
  p {
      margin-top: 20px;
  }
</style>