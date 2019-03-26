<template>
  <div id="app">
    <img alt="Vue logo" src="https://firebase.google.com/images/brand-guidelines/logo-standard.png?hl=pt-br" width="250" height="80">
    <router-view/>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
