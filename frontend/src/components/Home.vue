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
      <div v-for="flyer in listOfFlyers" :key="flyer">
        <figure>
          <div v-if="collectedFlyers.indexOf(flyer._id) >= 0">
            <input type="button" v-on:click="saveFlyer(flyer._id)" value="+">
          </div>
          <div v-else>
            <input type="button" v-on:click="saveFlyer(flyer._id)" value="-">
          </div>
          <input type="submit" v-on:click="delete_flyer(flyer._id)" value="Flag">
          <input type="button" v-on:click="get_info(flyer._id)" value="More information">
          <img :src="flyer.image_url" alt="">
          <figcaption>{{flyer.title}}</figcaption>
        </figure>
      </div>
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
      collectedFlyers: [],
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
      context.filter = sessionStorage.getItem('filter')
      // TODO: Set startdate and enddate filter here!
      axios.defaults.headers.common['token'] = localStorage.getItem('token')
      const body = new FormData()
      body.append('startdate', '')
      body.append('enddate', '')
      body.append('collected', sessionStorage.getItem('collected'))
      axios.post('http://localhost:5000/getflyers', body).then(res => {
        context.listOfFlyers = res.data.flyers
        context.collectedFlyers = res.data.collected
        context.len = res.data.flyers.length
        console.log('Total flyer #: ' + res.data.flyers.length)
        console.log('here')
      })
        .catch(function (error) {
          context.msg = 'an error occurred.' + error
        })
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
    saveFlyer (id) {
      /*
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
      */
      axios.defaults.headers.common['token'] = localStorage.getItem('token')
      const body = new FormData()
      body.append('flyer', id)
      axios.post('http://localhost:5000/collect', body).then(function (response) {
        console.log(response)
      }).catch(function (error) {
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
