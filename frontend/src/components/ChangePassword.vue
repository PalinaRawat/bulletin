<template>
  <div class="hello">
    <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link to="/change" tag="a">Change Password</router-link>
    </div>
    <div class="hello">
      <img id="icon" src="../assets/icon.svg">
      <p id="login">Change Password </p>
      <p type="error" style='color:red; font-size: 12px;' v-if='!success'>{{ message }}</p>
      <p type="error" style='color:green; font-size: 12px;' v-if='success'>{{ message }}</p>
      <div>
        <input type="email" v-model="credentials.email" placeholder="Username" name="psw"/>
      </div>
      <div>
        <input type="password" v-model="credentials.newPassword" placeholder="New Password" name="psw"/>
     </div>
     <div>
       <input type="password" v-model="credentials.confirmPassword" placeholder="Confirm Password" name="psw"/>
    </div>
      <button v-on:click="change">
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
        email: '',
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
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          token: localStorage.getItem('token')
        }
      }
      console.log(localStorage.getItem('token'))
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
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        email: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.topnav {
    overflow: hidden;
    background-color: #e9e9e9;
    margin-top: -60px;
    padding: 0px;
    list-style-type: none;
}
.topnav a {
    float: left;
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}
img {
  height: 4%;
  width: 4%;
}
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
