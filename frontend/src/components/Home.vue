<template>
  <div class="hello">
    <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link to="/about" tag="a">About</router-link>
      <router-link to="/contact" tag="a">Contact</router-link>
      <router-link to="/settings" tag="a">Settings</router-link>

       <button id="show-modal" @click="showModal = true">Create a flyer</button>

      <img src="../assets/icon.svg">
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <div class="modal-content">
        <form>
           Title:<br>
          <input type="text" id="title" value="">
          <br>
          <br>
           Description:<br>
          <input type="text" id="description" value="">
          <br>
          <br>
           image url:<br>
          <input type="text" id="image_url" value="">
          <br>
          <br>
           Start date of the event<br>
          <input type="date" id="startdate" value="">
           <br>
           <br>
           End date of the event<br>
          <input type="date" id="enddate" value="">
          <br>
          <br>
          <button id="submit" type="button"  v-on:click="click"> Submit </button>
        </form>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  name: 'Welcome',
  data () {
    return {
      showModal: false
    }
  },
  methods: {
    // click () {
    //   var url = 'http://localhost:8000/questions?auth='
    //   if (title.value === '') alert('Fill the title')
    //   else if (description.value === '') alert('Fill the description')
    //   else if (image_url.value === '') alert('Fill the image url')
    //   else if (startdate.value === '') alert('Fill the startdate')
    //   else if (enddate.value === '') alert('Fill the enddate')
    //   url = url + '&title=' + title.value + '&description=' + description.value + '&image_url=' + image_url.value + '&start-date=' + startdate.value + '&end-date=' + enddate.value
    //   console.log(url)
    // }
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
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
}
</style>
