<template>
  <div id="app">
    <nav>
      <ul class="list-container" style="text-align: center;">
        <li class="nav-item">
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="!store.currentUser" class="nav-item">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!store.currentUser" class="nav-item">
          <router-link to="/signup">Signup</router-link>
        </li>
        <li v-if="store.currentUser!=null">
          <router-link to="/food">Food</router-link>
        </li>
        <li v-if="store.currentUser!=null">
          <router-link to="/drinks">Drinks</router-link>
        </li>
        <li v-if="store.currentUser!=null">
          <router-link to="/reservations">Reservations</router-link>
        </li>
        <li v-if="store.currentUser!=null">
          <router-link to="/profile">Profile</router-link>
        </li>
        <li>
          <a v-if="store.currentUser" href="#" @click.prevent="logout()">Logout</a>
        </li>
        <li v-if="store.currentUser!=null">
          
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import store from '@/store';
import {firebase} from '../firebase';
firebase.auth().onAuthStateChanged((user) => {
  if (user){
    console.log(user.email);
    store.currentUser = user.email;
    store.currentUserName = user.displayName
  }
  else{
    console.log('No user')
    store.currentUser = null;
  }
})

export default{
  name: 'App',
  data(){
    return{
      store,
    }
  },
  methods:{
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({name:'login'});
      })
    },
  }
}

</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;
  background-color: #068DA9;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: white;
    }
  }
}

body{
  background-color: #DDE6ED;
}

.list-container {
  display: flex;
  padding: 0;
  list-style-type: none;
}

.list-container li {
  margin: 0 5px;
}

.dropbtn {
  background-color: #3498DB;
  color: white;
  padding: 5px;
  font-size: 15px;
  border: none;
  cursor: pointer;
  position: relative;
  display: inline-block;
}

.dropbtn:hover, .dropbtn:focus {
  background-color: #2980B9;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}
</style>
