<template>
  <div class="hello">
    <div class="topnav">
      <img src="../assets/icon.svg" style="float: left; margin-top: 7px;">
      <router-link class="active" to="/home" tag="a">Home</router-link>
    </div>
    <div class="hello">
      <img id="icon" src="../assets/icon.svg">
      <p id="login">Change Password </p>
      <p type="error" style='color:red; font-size: 12px;' v-if='!success'>{{ message }}</p>
      <p type="error" style='color:green; font-size: 12px;' v-if='success'>{{ message }}</p>
      <div>
        <input id="pwd" type="password" v-model="credentials.newPassword" placeholder="New Password" name="psw"/>
     </div>
     <div>
       <input  id="pwd" type="password" v-model="credentials.confirmPassword" placeholder="Confirm Password" name="psw"/>
    </div>
      <button id="changebtn" v-on:click="change">
        Change Password
      </button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'ChangePassword Fam',
      message: '',
      credentials: {
        newPassword: '',
        confirmPassword: ''
      },
      success: false
    }
  },
  methods: {
    change () {
      const context = this
      const axiosConfig = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      axios.post(`http://localhost:5000/change`, this.credentials, axiosConfig).then(res => {
        if (res.data.success) {
          context.message = 'Successfully Changed Password!'
          context.success = true
          // this.$router.push('home')
        } else {
          context.message = res.data.message
        }
      })
      this.credentials = {
        newPassword: '',
        confirmPassword: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css">
@import 'style.css';
</style>
