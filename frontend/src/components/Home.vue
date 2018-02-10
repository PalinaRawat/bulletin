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
      <figure>
        <img :src="listOfFlyers[0].image_url">
        <p>
          {{listOfFlyers[0].title}}
        </p>
      </figure>
      <figure>
        <img :src="listOfFlyers[1].image_url">
        <p>
          {{listOfFlyers[1].title}}
        </p>
      </figure>
      <figure>
        <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/belle.jpg">
        <figcaption>Belle, based on 1770’s French court fashion</figcaption>
      </figure>
      <figure>
        <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/mulan_2.jpg">
        <figcaption>Mulan, based on the Ming Dynasty period</figcaption>
      </figure>
      <figure>
        <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/sleeping-beauty.jpg">
        <figcaption>Sleeping Beauty, based on European fashions in 1485</figcaption>
      </figure>
      <figure>
        <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/pocahontas_2.jpg">
        <figcaption>Pocahontas based on 17th century Powhatan costume</figcaption>
      </figure>

<figure>
<img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/snow-white.jpg">
<figcaption>Snow White, based on 16th century German fashion</figcaption>
</figure>

 <figure>
<img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/ariel.jpg">
<figcaption>Ariel wearing an evening gown of the 1890’s</figcaption>
</figure>

<figure>
<img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/4273/tiana.jpg">
<figcaption>Tiana wearing the <i>robe de style</i> of the 1920’s</figcaption>
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
      url1: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mallard2.jpg/1200px-Mallard2.jpg',
      title1: 'broken',
      listOfFlyers: [],
      currentFlyers: [],
      counter: 0
    }
  },
  created () {
    this.getflyers()
    this.selectFlyers()
  },
  methods: {
    getflyers () {
      const context = this
      context.message = 'yoo'
      axios.post(`http://localhost:5000/getflyers`, this.credentials).then(res => {
        context.listOfFlyers = res.data.flyers
      })
        .catch(function (error) {
          context.msg = 'an error occurred.' + error
        })
    },
    getImageSource () {
      const context = this
      return context.imageSource
    },
    selectFlyers () {
      const context = this
      var i = 0
      for (i = 0; i < 9; i++) {
        context.currentFlyers[i] = context.listOfFlyers[context.counter]
        context.counter++
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
body {
  background: url(//subtlepatterns.com/patterns/scribble_light.png);
  font-family: Calluna, Arial, sans-serif;
  min-height: 1000px;
}
#columns {
  column-width: 320px;
  column-gap: 15px;
  width: 90%;
  max-width: 1100px;
  margin: 50px auto;
}

div#columns figure {
  background: #fefefe;
  border: 2px solid #fcfcfc;
  box-shadow: 0 1px 2px rgba(34, 25, 25, 0.4);
  margin: 0 2px 15px;
  padding: 15px;
  padding-bottom: 10px;
  transition: opacity .4s ease-in-out;
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
  opacity: 0.4;
}

@media screen and (max-width: 750px) {
  #columns { column-gap: 0px; }
  #columns figure { width: 100%; }
}
</style>
