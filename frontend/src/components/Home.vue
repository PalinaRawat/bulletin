/*global click title:true*/
<template>
  <div class="home">
   <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link class="active" to="/settings" tag="a">Settings</router-link>
       <button id="show-modal" @click="showModal = true">Create a flyer</button>
      <img src="../assets/icon.svg">
    </div>

    <modal v-if="showModal" @close="showModal = false">
      <div class="modal-content">
        <form>
           Title:<br>
          <input type="text" name="title">
          <br>
          <br>
           Description:<br>
          <input type="text" name="description">
          <br>
          <br>
           image url:<br>
          <input type="text" name="imageurl">
          <br>
          <br>
           Start date of the event<br>
          <input type="date" name="startdate">
           <br>
           <br>
           End date of the event<br>
          <input type="date" name="enddate">
          <br>
          <br>
          <button id="submit" type="button" v-on:click="click" @click="showModal = false"> Submit </button>
        </form>
      </div>
    </modal>

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
    <div>
      <button v-on:click="prevPage">
          Previous
      </button>
      <button v-on:click="nextPage">
          Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  showModal: false,
  name: 'Welcome',
  data () {
    return {
      msg: 'Home Page',
      listOfFlyers: [],
      currentFlyers: [],
      showModal: false,
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
      pos += parseInt(sessionStorage.getItem('flyerCount'))
      console.log('session Store: ' + pos)
      if (pos > context.len) {
        context.title1 = 'null title'
        return 'https://i2.wp.com/bibletruthandprophecy.com/wp-content/uploads/2016/01/unavailable.jpg?fit=522%2C315'
      }
      if (context.listOfFlyers[pos] == null) {
        context.title1 = 'null title'
        return 'https://i2.wp.com/bibletruthandprophecy.com/wp-content/uploads/2016/01/unavailable.jpg?fit=522%2C315'
      }
      context.title1 = context.listOfFlyers[pos].title
      return context.listOfFlyers[pos].image_url
    },
    nextPage () {
      const context = this
      context.counter = parseInt(sessionStorage.getItem('flyerCount')) + 10
      sessionStorage.setItem('flyerCount', context.counter)
      location.reload()
    },
    prevPage () {
      const context = this
      context.counter = parseInt(sessionStorage.getItem('flyerCount'))
      if (context.counter > 9) {
        context.counter = parseInt(sessionStorage.getItem('flyerCount')) - 10
        sessionStorage.setItem('flyerCount', context.counter)
        location.reload()
      }
    },
    click () {
      var auth = localStorage.getItem('auth', null)
      var url = 'http://localhost:8000/createflyer?auth=' + auth
      var title = document.querySelector('input[name=title]').value
      var description = document.querySelector('input[name=description]').value
      var imageurl = document.querySelector('input[name=imageurl]').value
      var startdate = document.querySelector('input[name=startdate]').value
      var enddate = document.querySelector('input[name=enddate]').value
      if (title === '') alert('Fill the title')
      else if (description === '') alert('Fill the description')
      else if (imageurl === '') alert('Fill the image url')
      else if (startdate === '') alert('Fill the startdate')
      else if (enddate === '') alert('Fill the enddate')
      else {
        url = url + '&title=' + title + '&description=' + description + '&imageurl=' + imageurl + '&start-date=' + startdate + '&end-date=' + enddate.value
        axios.post(url)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body {
  height: 100%;
  width: 100%;
}
h1, h2 {
  font-size: 2em;
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
.home {
  font-family: Calluna, Arial, sans-serif;
  background-size: cover;
  color: black;
  height: 100%;
  width: 100%;
}
img {
  height: 4%;
  width: 4%;
}
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
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
  /*
    background below changes the color inside each flyer box
  */
  background: rgba(23, 137, 222, 1);
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
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;

}
</style>
