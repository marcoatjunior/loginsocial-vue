<template>
  <div class="home">
    <People />
    <button @click="logout">Sair</button>
  </div>
</template>

<script>
import firebase from 'firebase';
import People from '@/components/People.vue'

export default {
  name: 'people',
  components: {
    People
  },
  methods: {
    logout: function() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>
