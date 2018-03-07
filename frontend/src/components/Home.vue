<template>
  <div class="home">
   <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link class="active" to="/settings" tag="a">Settings</router-link>
      <router-link to="/" @click.native="logout">Logout</router-link>
      <b-btn v-b-modal.modal>Create a flyer</b-btn>
      <img src="../assets/icon.svg">
    </div>
  <b-modal id="modal" title="Fill the form" ref="myModalRef">
   <b-form>
        <b-form-input id="title"
                      name="title"
                      v-model="form.title"
                      required
                      placeholder="Title">
        </b-form-input>
        <br>
        <b-form-input id="description"
                      v-model="form.description"
                      required
                      placeholder="Description">
        </b-form-input>
        <br>
        <b-form-group id="startdate1"
                    label="Start date:"
                    label-for="startdate">
              <b-form-input id="startdate"
                          type="date"
                          v-model="form.startdate"
                          required
                          placeholder="Start date">
            </b-form-input>
        </b-form-group>
        <br>
        <b-form-group id="enddate1"
                    label="End date:"
                    label-for="enddate">
        <b-form-input id="enddate"
                      required
                      type="date"
                      v-model="form.enddate"
                      placeholder="End date">
        </b-form-input>
        </b-form-group>
        <br>
        <b-form-file v-model="form.image" :state="Boolean(form.image)" required placeholder="Choose an image..."></b-form-file>
        </b-form>
        <div slot="modal-footer" class="w-100">
         <b-btn size="sm" class="float-right" variant="primary" @click="onSubmit">
           Submit
         </b-btn>
         </div>
  </b-modal>
    <div id="filterDiv">
        <p style="display:block">Filter by: {{filter}}</p>
        <p style="display:inline-block">Collected only</p>
        <input id="collectedBox" type="checkbox" style="display:inline-block"/>
        <select style="display:inline-block" name ="selectFilter" v-model="filter">
          <option value="All" selected>All</option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
        <button style="display:inline-block" v-on:click="updateFilter">Confirm</button>

    </div>

    <div id="columns">
      <!-- title1 is set in getFlyerImage to the corresponding title -->
      <figure>
        <input type="button" v-on:click="saveFlyer(0)" value="Save">
        <input type="submit" v-on:click="delete_flyer(0)" value="Flag">
        <input type="button" v-on:click="get_info(0)" value="More information">
        <img :src="getFlyerImage(0)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <input type="button" v-on:click="saveFlyer(1)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
        <img :src="getFlyerImage(1)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <input type="button" v-on:click="saveFlyer(2)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
        <img :src="getFlyerImage(2)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <input type="button" v-on:click="saveFlyer(3)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
        <img :src="getFlyerImage(3)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <input type="button" v-on:click="saveFlyer(4)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
        <img :src="getFlyerImage(4)">
        <figcaption>{{title1}}</figcaption>
      </figure>
      <figure>
        <input type="button" v-on:click="saveFlyer(5)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
        <img :src="getFlyerImage(5)">
        <figcaption>{{title1}}</figcaption>
      </figure>

      <figure>
        <input type="button" v-on:click="saveFlyer(6)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
        <img :src="getFlyerImage(6)">
        <figcaption>{{title1}}</figcaption>
      </figure>

      <figure>
        <input type="button" v-on:click="saveFlyer(7)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
        <img :src="getFlyerImage(7)">
        <figcaption>{{title1}}</figcaption>
      </figure>

      <figure>
        <input type="button" v-on:click="saveFlyer(8)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
        <img :src="getFlyerImage(8)">
        <figcaption>{{title1}}</figcaption>
      </figure>

      <figure>
        <input type="button" v-on:click="saveFlyer(9)" value="Save">
        <input type="submit" v-on:click="delete_flyer(1)" value="Flag">
        <input type="button" v-on:click="get_info(1)" value="More information">
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
import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
export default {
  name: 'Welcome',
  filter: 'all',
  data () {
    return {
      msg: 'Home Page',
      listOfFlyers: [],
      currentFlyers: [],
      counter: 0,
      form: {
        title: '',
        description: '',
        startdate: '',
        enddate: '',
        image: null
      }
    }
  },
  created () {
    this.getflyers()
  },
  methods: {
    logout () {
      console.log('I am logging out')
      localStorage.removeItem('token')
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    getflyers () {
      const context = this
      var collected = false
      context.filter = sessionStorage.getItem('filter')
      var collectedStr = sessionStorage.getItem('collected')
      if (collectedStr === 'true') {
        collected = true
      }
      console.log('collected? ' + collected)
      console.log('current filter: ' + context.filter)
      var dateObj = new Date()
      var end = new Date()
      if (context.filter === 'All') {
        console.log('print all')
        end.setFullYear(dateObj.getFullYear() + 1)
      } else if (context.filter === 'Day') {
        console.log('filter by day')
      } else if (context.filter === 'Week') {
        end.setDate(dateObj.getDate() + 7)
        console.log('filter by week')
      } else if (context.filter === 'Month') {
        end.setMonth(dateObj.getMonth() + 1)
      }
      console.log('start date: ' + dateObj)
      console.log('end date: ' + end)
      const axiosConfig = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      axios.post('http://localhost:5000/getflyers?collected' + collected + '&startdate=' + dateObj + '&enddate=' + end, this.credentials, axiosConfig).then(res => {
        context.listOfFlyers = res.data.flyers
        context.len = res.data.flyers.length
        console.log('Total flyer #: ' + res.data.flyers.length)
        console.log('here')
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
      if (context.counter + 10 > context.len) {
        console.log('end of flyers')
        return
      }
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
    delete_flyer (pos) {
      const context = this
      if (context.counter + pos >= context.len) {
        console.log('cannot flag empty flyer')
        return
      }
      var url = 'http://localhost:5000/flagflyer?'
      url = url + '&flyer=' + context.listOfFlyers[pos]._id
      console.log(context.listOfFlyers[pos]._id)
      const axiosConfig = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      axios.post(url, this.credentials, axiosConfig)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    get_info (pos) {
      const context = this
      if (context.counter + pos >= context.len) {
        console.log('cannot view empty flyer')
        return
      }
      var url = 'http://localhost:5000/getflyerinfo?&flyer=' + context.listOfFlyers[pos]._id
      const axiosConfig = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      axios.post(url, this.credentials, axiosConfig).then(res => {
        this.showInfo = true
        console.log(res.title)
        console.log(res)
      })
        .catch(function (error) {
          context.msg = 'an error occurred.' + error
        })
    },
    onSubmit (evt) {
      var url = 'http://localhost:5000/createflyer?'
      if (this.form.title === '') alert('Fill the title')
      else if (this.form.description === '') alert('Fill the description')
      else if (this.form.startdate === '') alert('Select a startdate')
      else if (this.form.enddate === '') alert('Select an enddate')
      else if (this.form.image === null) alert('Upload an image')
      else {
        this.$refs.myModalRef.hide()
        var startdate = new Date(this.form.startdate)
        var enddate = new Date(this.form.enddate)
        const formData = new FormData()
        formData.append('token', localStorage.getItem('token'))
        formData.append('image', this.form.image)
        formData.append('title', this.form.title)
        formData.append('description', this.form.description)
        formData.append('startdate', startdate)
        formData.append('enddate', enddate)
        axios.post(url, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              token: localStorage.getItem('token')
            }
          })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    saveFlyer (pos) {
      const context = this
      context.counter = parseInt(sessionStorage.getItem('flyerCount'))
      if (context.counter + pos >= context.len) {
        console.log('cannot save empty flyer')
        return
      }
      document.getElementById('saveBtn').value = 'saved'
      var flyer = context.listOfFlyers[context.counter + pos]
      var id = flyer._id
      const axiosConfig = {
        headers: {
          token: localStorage.getItem('token')
        }
      }
      var url = 'http://localhost:5000/collect?flyer=' + id
      axios.post(url, this.credentials, axiosConfig)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    updateFilter () {
      const context = this
      sessionStorage.setItem('filter', context.filter)
      var x = document.getElementById('collectedBox').checked
      if (x === true) {
        sessionStorage.setItem('collected', 'true')
      } else {
        sessionStorage.setItem('collected', 'false')
      }
      console.log(context.filter)
      location.reload()
    }
  }
}
</script>
<style lang="css">
@import 'style.css';
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
