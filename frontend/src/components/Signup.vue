<template>
  <div class="hello">
    <img id="icon" src="../assets/icon.svg">
    <p id="signup">Sign Up</p>
    <p type="error" style='color:red; font-size: 12px;' v-if='!success'>{{ message }}</p>
    <p type="error" style='color:green; font-size: 12px;' v-if='success'>{{ message }}</p>
    <div>
      <input type="email" v-model="credentials.email" placeholder="Username" name="uname"/>
    </div>
    <div>
      <input type="password" v-model="credentials.password" placeholder="Password" name="psw"/>
    </div>
    <button v-on:click="signup">
      Signup
    </button>
    <div class="login-container">
      Already have an account?<br/>
      <router-link to="/login" tag="button">Login</router-link>
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
    signup () {
      const context = this
      axios.post(`http://localhost:5000/signup`, this.credentials).then(res => {
        if (res.data.success) {
          context.message = 'Successfully signed up!'
          context.success = true
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
.hello {
  font-family: 'Lato', sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#signup{
  font-size: 30px;
  margin-bottom: 0px;
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
    padding: 10px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    font-size: 20px;
}
</style>
