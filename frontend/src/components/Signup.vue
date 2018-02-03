<template>
  <div class="hello">
    <img id="icon" src="../assets/icon.svg">
    <p>Sign Up</p>
    <p type="error" style='color:red; font-size: 12px;' v-if='!success'>{{ message }}</p>
    <p type="error" style='color:green; font-size: 12px;' v-if='success'>{{ message }}</p>
    <div class="input-container">
      Email<br/>
      <input type="email" v-model="credentials.email"/><br/>
    </div>
    <div class="input-container">
      Password<br/>
      <input type="password" v-model="credentials.password"/>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
.input-container {
  font-size: 12px;
}

p1 {
  font-size: 12px;
}

</style>
