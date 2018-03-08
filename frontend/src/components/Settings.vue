<template>
  <div class="hello">
    <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link to="/change" tag="a">Change Password</router-link>
    </div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Settings Page Fam'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
@import 'style.css';
</style>
