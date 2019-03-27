<template>
  <div class="sign-up">
      <div class="row">
          <div class="col-md-12">
              <h3>Cadastre-se no formulário abaixo</h3>
              <input type="text" v-model="name" placeholder="Nome"><br>
              <input type="email" v-model="email" placeholder="E-mail"><br>
              <input type="password" v-model="password" placeholder="Senha"><br>
              <button @click="signUp" class="btn btn-primary">Cadastrar</button>
              <br>
              <p><router-link to="/login">Voltar a tela inicial</router-link></p>
          </div>
      </div>
  </div>
</template>

 <script>

  import {peopleRef} from "../firebase";
  import firebase from 'firebase';

  export default {
    name: 'signUp',
    data() {
      return {
        name: "",
        email: "",
        password: ""
      }
    },
    firebase: {
        people: peopleRef
    },
    methods: {
      addPerson: function (name, email) {

          for (var [key, object] of Object.entries(this.people)) {
              // Se já possui o e-mail, sai do método
              if (object.email == email) {
                  return false;
              }
          }

          let date = new Date(),
              day = date.getDate().toString(),
              dayF = day.length == 1 ? "0" + day : day,
              month = (date.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
              monthF = month.length == 1 ? "0" + month : month,
              yearF = date.getFullYear();

          peopleRef.push({
            name: name,
            email: email,
            documents: {
              cpf: "00000000000"
            },
              created_at: dayF + "/" + monthF + "/" + yearF,
            role: 2,
            edit: false
        });
      },
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
              this.addPerson(this.name, this.email);
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