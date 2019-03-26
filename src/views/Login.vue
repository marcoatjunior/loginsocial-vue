<template>
  <div class="login">
    <div class="row">
      <div class="col-md-12">
        <h3>Acesso ao sistema</h3>
        <input type="text" v-model="email" placeholder="E-mail"><br>
        <input type="password" v-model="password" placeholder="Senha"><br>
        <button @click="login" class="btn btn-primary">Entrar</button>
        <p>Não possui uma conta ? Você pode <router-link to="/sign-up">criar aqui</router-link></p>
        <p>
          ou acesse com uma conta do Google <br><br>
          <a @click="socialLogin" class="social-button">
            <img src="http://pngimg.com/uploads/google/google_PNG19635.png" width="30" height="30" title="Google">
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            // login(result.additionalUserInfo.profile.name, result.additionalUserInfo.profile.email);
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
      },
      socialLogin() {
        const provider = new firebase.auth.GoogleAuthProvider;

        firebase.auth().signInWithPopup(provider).then((result) => {

          for (var [key, value] of Object.entries(result.credential)) {
            localStorage.setItem(key, value);
          }
          this.$router.replace('home');
        }).catch((err) => {
          console.log(err.message);
          alert('A janela de conexão foi fechada. Por favor, tente novamente.');
        });
      }
    }
  }
</script>

<style scoped>
  .login {
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
  p {
    margin-top: 20px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>