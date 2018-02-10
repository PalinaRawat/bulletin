<template>
  <div class="hello">
    <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link to="/about" tag="a">About</router-link>
      <router-link to="/contact" tag="a">Contact</router-link>
      <img src="../assets/icon.svg">
    </div>
    <h1>{{ msg }}</h1>
    <img :src = "getImageSource()">
    <li v-for="item in items">
      {{item.title}}
    </li>
    <figure class="figure">
      <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/cinderella.jpg">
      <figcaption>Cinderella wearing European fashion of the mid-1860’s</figcaption>
    </figure>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'This is the home page.',
      items: []
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
        context.imageSource = res.data.flyers[1].image_url
        context.items = res.data.flyers
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
figure {
  display: block;
  border: 100px;
  border-color: darkgrey
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
