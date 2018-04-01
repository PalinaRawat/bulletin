<template>
  <div class="hello">
    <img id="icon" src="../assets/icon.svg">
    <p id="login">Reset Password </p>
    <p type="error" style='color:green; font-size: 12px;' v-if='success'>{{ message }}</p>
    <p type="error" style='color:green; font-size: 12px;' v-if='qSuccess'>{{ qMessage }}</p>
    <div v-if='!success'>
      <input type="email" v-model="credentials.email" placeholder="Username" name="psw"/>
    </div>
    <div v-if='success'>
      <div><span> {{ question }} </span></div>
      <input type="answer" v-model="credentials.answer" placeholder="Answer..." name="sqq"/>
    </div>
    <button v-on:click="submitUser" v-if="!success">
      Submit Username
    </button>
    <button v-on:click="reset" v-if="success">
      Reset Password
    </button>
    <div class="login-container">
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
      qMessage: '',
      credentials: {
        email: '',
        answer: ''
      },
      success: false,
      qSuccess: false,
      question: ''
    }
  },
  methods: {
    submitUser () {
      const context = this
      axios.post(`http://localhost:5000/checkUser`, this.credentials).then(res => {
        if (res.data.success) {
          context.success = true
          context.question = res.data.question
          context.message = res.data.message
        } else {
          context.message = res.data.message
        }
      })
    },
    reset () {
      const context = this
      axios.post(`http://localhost:5000/reset`, this.credentials).then(res => {
        // if (res.data.success) {
        // context.message = res.data.message
        context.qMessage = 'Change New Password in Account Settings'
        context.qSuccess = true
        // } else {
        // }
      })
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
