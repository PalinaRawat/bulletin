<template>
  <div class="hello">
    <img id="icon" src="../assets/icon.svg">
    <p id="login">Login</p>
    <p type="error" style='color:red; font-size: 12px;' v-if='!success'>{{ message }}</p>
    <p type="error" style='color:green; font-size: 12px;' v-if='success'>{{ message }}</p>
    <div>
      <input type="email" v-model="credentials.email" placeholder="Username" name="uname"/>
    </div>
    <div>
      <input type="password" v-model="credentials.password" placeholder="Password" name="psw"/>
   </div>
    <button v-on:click="login">
      Login
    </button>
    <div class="login-container">
      Need an account?<br/>
      <router-link to="/signup" tag="button">Signup</router-link>
    </div>
    <div class="login-container">
      Forgot Password?<br/>
      <router-link to="/reset" tag="button">Reset Password</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      data: [],
      message: '',
      credentials: {
        email: '',
        password: ''
      },
      success: false
    }
  },
  methods: {
    login () {
      const context = this
      sessionStorage.setItem('flyerCount', 0)
      axios.post(`http://localhost:5000/login`, this.credentials).then(res => {
        if (res.data.success) {
          context.message = 'Successfully logged in!'
          context.success = true
          localStorage.setItem('token', res.data.token)
          axios.defaults.headers.common['token'] = res.data.token
          this.$router.push('home')
        } else {
          context.message = res.data.message
        }
      })
      this.credentials = {
        email: '',
        password: ''
      }
    }
  }
}
</script>

<style>
<style scoped>
.hello {
  font-family: 'Lato', sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#icon {
  width: 60px;
  margin-bottom: 0;
}

.login-container {
  margin-top: 30px;
  font-size: 12px;
}

input {
    width: 20%;
    min-width: 150px;
    padding: 10px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 15px;
    text-align: center;
    outline-width: 1px;
}

#login{
  font-size: 25px;
  margin-bottom: 0px;
}
</style>
