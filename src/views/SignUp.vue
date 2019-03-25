<template>
  <div class="sign-up">
    <p>Bem-vindo à tela de cadastro!</p>
    <input type="text" v-model="email" placeholder="E-mail"><br>
    <input type="password" v-model="password" placeholder="Senha"><br>
    <button @click="signUp">Cadastrar</button>
    <span>Voltar à <router-link to="/login">tela inicial</router-link>.</span>
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
              alert('Ocorreu um erro ao efetuar o login. Por favor, tente novamente.');
          }
        );
      }
    }
  }
</script>

 <style scoped>
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>