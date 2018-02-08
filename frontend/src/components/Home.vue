<template>
  <div class="hello">
    <div class="topnav">
      <router-link class="active" to="/home" tag="a">Home</router-link>
      <router-link to="/about" tag="a">About</router-link>
       <button id="show-modal" @click="showModal = true">Create a flyer</button>
      <img src="../assets/icon.svg">
    </div>
    <modal v-if="showModal" @close="showModal = false">
      <div class="modal-content">
        <form>
           Title:<br>
          <input type="text" name="firstname" value="">
          <br>
          <br>
           Description:<br>
          <input type="text" name="lastname" value="">
          <br>
          <br>
           image url:<br>
          <input type="text" name="image_url" value="">
          <br>
          <br>
           Start date of the event<br>
          <input type="date" name="eventdate" value="">
           <br>
           <br>
           End date of the event<br>
          <input type="date" name="eventdate" value="">
          <br>
          <br>
          <button id="submit" type="button" @click="showModal = false"> Submit </button>
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
