<template>
  <div class="hello">
    <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link to="/about" tag="a">About</router-link>
      <router-link to="/contact" tag="a">Contact</router-link>
      <img src="../assets/icon.svg">
    </div>
    <h1>{{ msg }}</h1>
    <div>
      <button v-on:click='getflyers'>
        View flyers
      </button>
    </div>
    <img :src = "getImageSource()">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'This is the home page. I haven\'t done anything for this yet. meep'
    }
  },
  created () {
    this.getflyers()
  },
  methods: {
    getflyers () {
      const context = this
      context.message = 'yoo'
      axios.post(`http://localhost:5000/getflyers`, this.credentials).then(res => {
        context.msg = res.data.result[0].title
        context.imageSource = res.data.result[1].image_url
      })
        .catch(function (error) {
          context.msg = 'an error occurred.' + error
        })
    },
    getImageSource () {
      const context = this
      return context.imageSource
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
</style>
