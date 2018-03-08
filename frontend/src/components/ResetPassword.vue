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
        if (res.data.success) {
          context.message = res.data.message
          context.qMessage = 'Change in Account Settings'
          context.qSuccess = true
        } else {
          context.message = res.data.message
        }
      })
    }
  }
}
</script>

<style lang="css">
@import 'style.css';
</style>
