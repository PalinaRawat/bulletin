<template>
  <div class="hello">
    <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link to="/about" tag="a">About</router-link>
      <router-link to="/contact" tag="a">Contact</router-link>
      <img src="../assets/icon.svg">
    </div>
    <h1>{{msg}}</h1>
    <div id="columns">
      <!-- title1 is set in getFlyerImage to the corresponding title -->
      <figure>
        <img :src="getFlyerImage(0)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <img :src="getFlyerImage(1)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <img :src="getFlyerImage(2)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <img :src="getFlyerImage(3)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <img :src="getFlyerImage(4)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <img :src="getFlyerImage(5)">
        <figcaption>{{title1}}</figcaption>
      </figure>

      <figure>
        <img :src="getFlyerImage(6)">
        <figcaption>{{title1}}</figcaption>
      </figure>

      <figure>
        <img :src="getFlyerImage(7)">
        <figcaption>{{title1}}</figcaption>
      </figure>

      <figure>
        <img :src="getFlyerImage(8)">
        <figcaption>{{title1}}</figcaption>
      </figure>

      <figure>
        <img :src="getFlyerImage(9)">
        <figcaption>{{title1}}</figcaption>
      </figure>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Home Page',
      listOfFlyers: [],
      currentFlyers: [],
      counter: 0
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
        context.listOfFlyers = res.data.flyers
        context.len = res.data.flyers.length
        console.log('Total flyer #: ' + res.data.flyers.length)
      })
        .catch(function (error) {
          context.msg = 'an error occurred.' + error
        })
    },
    getFlyerImage (pos) {
      const context = this
      if (context === null) {
        console.log('context null')
        return
      }
      if (pos >= context.len) {
        console.log('array out of bounds')
        context.title1 = 'oopsies'
        return 'https://i2.wp.com/bibletruthandprophecy.com/wp-content/uploads/2016/01/unavailable.jpg?fit=522%2C315'
      }
      pos += context.counter
      context.title1 = context.listOfFlyers[pos].title
      if (context.title1 === null) {
        context.title1 = 'oopsies'
        return 'https://i2.wp.com/bibletruthandprophecy.com/wp-content/uploads/2016/01/unavailable.jpg?fit=522%2C315'
      }
      return context.listOfFlyers[pos].image_url
    },
    nextPage () {
      const context = this
      context.counter += 10
    },
    prevPage () {
      const context = this
      if ((context.counter / 10) > 0) {
        context.counter -= 10
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background-color: rgb(116, 6, 90) !important;
  font-family: Calluna, Arial, sans-serif;
  min-height: 1000px;
}
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
#columns {
  column-width: 320px;
  column-gap: 15px;
  width: 90%;
  max-width: 1500px;
  margin: 50px auto;
  column-fill: balance;
}

div#columns figure {
  background: rgba(255, 255, 255, 0);
  border: 2px solid #fcfcfc;
  box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
  margin: 0 2px 15px;
  padding: 15px;
  column-fill: balance;
  padding-bottom: 10px;
  display: inline-block;
  column-break-inside: avoid;
}

div#columns figure img {
  width: 100%; height: auto;
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
  margin-bottom: 5px;
}

div#columns figure p {
  font-size: .9rem;
  color: #444;
  line-height: 1.5;
}

div#columns small {
  font-size: 1rem;
  float: right;
  text-transform: uppercase;
  color: #aaa;
}

div#columns small a {
  color: #666;
  text-decoration: none;
  transition: .4s color;
}

div#columns:hover figure:not(:hover) {

}

@media screen and (max-width: 750px) {
  #columns { column-gap: 0px; }
  #columns figure { width: 100%; }
}
</style>
