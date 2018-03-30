<template>
  <div class="hello">
    <img src="../assets/icon.svg">
    <h1>{{ msg }}</h1>
    <router-link to="/signup" tag="button">Login</router-link>
    <router-link to="/login" tag="button">Signup</router-link>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome to Bulletin'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
    background-color: #ADD8E6;
    color: black;
    font-size: 15px;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 20%;
    min-width: 150px;
}
button:hover {
    background-color: #ADD2E6;
}
</style>
