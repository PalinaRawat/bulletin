<template>
  <div class="home">
   <div class="topnav">
     <img src="../assets/icon.svg" style="float: left; margin-top: 7px;">
     <router-link class="active" to="/home" tag="a" style="margin-top: 7px;">Home</router-link>
     <router-link class="active" to="/settings" tag="a" style="margin-top: 7px;">Settings</router-link>
     <router-link to="/" @click.native="logout" style="float: right; margin-right: 50px; margin-top: 7px; display: inline;"><b-btn style="background-color: red;">Logout</b-btn></router-link>
     <b-btn v-b-modal.modal style="float: right; margin-right: 15px; margin-top: 20px;">Create a flyer</b-btn>
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
        <p style="display:block">Filter by: {{this.filter}}</p>
        <p style="display:inline-block">Collected only</p>
        <input id="collectedBox" type="checkbox" style="display:inline-block"  v-if="collected == 'false'"/>
        <input id="collectedBox" type="checkbox" style="display:inline-block" v-else checked/>
        <select style="display:inline-block" name ="selectFilter" v-model="filter">
          <option value="All" selected>All</option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
        <button id="confirmbtn" style="display:inline-block" v-on:click="updateFilter">Confirm</button>

    </div>

    <div id="columns">
      <div v-for="(flyer, index) in listOfFlyers" v-bind:key="index">
        <b-modal ref="flyermodal" :id="flyer.title" :title="flyer.title">
          <img :src="flyer.image_url" style="opacity: 1; max-width: 200px; max-height 200px; width: auto; height: auto;" alt="">
          <p class="my-4">flyer.description</p>
          <p class="my-4">Date: {{new Date(flyer.startdate).toDateString()}} - {{new Date(flyer.enddate).toDateString()}}</p>
          <div slot="modal-footer" class="w-100">
            <b-btn v-if="collectedFlyers.indexOf(flyer._id) == -1" v-on:click="saveFlyer(flyer._id)" style="background-color: green;">Collect</b-btn>
            <b-btn v-else v-on:click="saveFlyer(flyer._id)" style="background-color: darkgreen;">Collected</b-btn>
            <b-btn v-if="flyer.owner == currentuser" v-on:click="delete_flyer(flyer._id)" style="background-color: red;">X</b-btn>
            <b-btn v-else v-on:click="delete_flyer(flyer._id)" @click="hide_modal" value="flag" style="background-color: red;">&#9873;</b-btn>
          </div>
        </b-modal>
        <div class="container">
          <div class="flyer-container">
            <div class="flyer">
              <img :src="flyer.image_url" alt="" v-b-modal="flyer.title">
              <div class="middle">
                <b-btn v-b-modal="flyer.title">More Information</b-btn>
              </div>
            </div>
          </div>
        </div>
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
  filter: 'All',
  data () {
    return {
      msg: 'Home Page',
      listOfFlyers: [],
      collectedFlyers: [],
      currentFlyers: [],
      collected: sessionStorage.getItem('collected'),
      currentuser: '',
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
      // localStorage.removeItem('token')
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    },
    getflyers () {
      // TODO: Fix cards rendering out of order
      const context = this
      context.filter = sessionStorage.getItem('filter')
      var dateObj = new Date()
      var end = new Date()
      if (context.filter === 'All') {
        end.setFullYear(dateObj.getFullYear() + 3)
      } else if (context.filter === 'Week') {
        end.setMonth(dateObj.getMonth() + 1)
      } else if (context.filter === 'Month') {
        end.setMonth(dateObj.getMonth() + 1)
      }
      axios.defaults.headers.common['token'] = localStorage.getItem('token')
      const body = new FormData()
      body.append('startdate', dateObj)
      body.append('enddate', end)
      body.append('collected', sessionStorage.getItem('collected'))
      axios.post('http://localhost:5000/getflyers', body).then(res => {
        context.listOfFlyers = res.data.flyers
        context.collectedFlyers = res.data.collected
        context.currentuser = res.data.currentuser
        context.len = res.data.flyers.length
        console.log('Received ' + res.data.flyers.length + ' flyers!')
      }).catch(function (error) {
        console.log(error)
      })
    },
    hide_modal () {
      this.$refs.myModalRef.hide()
    },
    delete_flyer (flyer, id, title) {
      axios.defaults.headers.common['token'] = localStorage.getItem('token')
      const body = new FormData()
      body.append('flyer', flyer)
      axios.post('http://localhost:5000/flagflyer', body).then(res => {
        if (res.data.success) {
          location.reload()
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    onSubmit (evt) {
      var url = 'http://localhost:5000/createflyer?'
      if (this.form.title === '') alert('Fill the title')
      else if (this.form.description === '') alert('Fill the description')
      else if (this.form.startdate === '') var alertMsg = 'Select a start date'
      else if (this.form.enddate === '') console.log(alertMsg)
      else if (this.form.image === null) alert('Upload an image')
      else {
        // var presentReference = new Date()
        // var start = new Date(this.form.startdate)

        // this.$refs.myModalRef.hide()
        const formData = new FormData()
        formData.append('token', localStorage.getItem('token'))
        formData.append('image', this.form.image)
        formData.append('title', this.form.title)
        formData.append('description', this.form.description)
        formData.append('startdate', this.form.startdate)
        formData.append('enddate', this.form.enddate)
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
      const context = this
      axios.defaults.headers.common['token'] = localStorage.getItem('token')
      const body = new FormData()
      body.append('flyer', id)
      axios.post('http://localhost:5000/collect', body).then(function (response) {
        console.log(response)
        var index = context.collectedFlyers.indexOf(id)
        if (index !== -1) {
          context.collectedFlyers.splice(index, 1)
        } else {
          context.collectedFlyers.push(id)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateFilter () {
      const context = this
      sessionStorage.setItem('filter', context.filter)
      var x = document.getElementById('collectedBox').checked
      console.log(x)
      if (x === false) {
        sessionStorage.setItem('collected', 'true')
        this.collected = 'true'
      } else {
        sessionStorage.setItem('collected', 'false')
        this.collected = 'false'
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
