<template>
  <div class="people">
    <h1>Lista de Pessoas</h1>
    <div>
      <label><strong>Nome:</strong></label><br>
      <input type="text" v-model="name" />
      <button @click="submitName()" class="add">Adicionar</button>
    </div>
    <div>
      <ul>
        <li v-for="personName of names" :key="personName['.key']">
          <div v-if="!personName.edit">
            <p>{{ personName.name }}</p>
            <button @click="setEditPerson(personName['.key'])">Editar</button>
            <button @click="removePerson(personName['.key'])">Excluir</button>
          </div>
          <div v-else>
            <input type="text" v-model="personName.name">
            <button @click="editPerson(personName)">Salvar</button>
            <button @click="cancelEdit(personName['.key'])">Cancelar</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  import { namesRef } from '../main';


export default {
  name: 'Pessoas',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    submitName(){
      namesRef.push({ name: this.name, edit: false });
      this.name = '';
    },
    removePerson(key){
      namesRef.child(key).remove();
    },
    setEditPerson(key){
      namesRef.child(key).update({ edit: true });
    },
    cancelEdit(key){
      namesRef.child(key).update({ edit: false });
    },
    editPerson(person){
      const key = person['.key'];
      namesRef.child(key).set({ name: person.name, edit: false });
    }
  }
}
</script>

<style scoped>
  .people {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
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
    color: #42b983;
  }
</style>
