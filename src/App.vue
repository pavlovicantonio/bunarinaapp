<template>
  <div id="app">
    <nav>
      <ul class="list-container" style="text-align: center;">
        <li class="nav-item">
          <router-link to="/"><v-icon v-if="store.currentUser != null">mdi-home</v-icon>Home</router-link>
        </li>
        <li v-if="!store.currentUser" class="nav-item">
          <router-link to="/login">Login</router-link>
        </li>
        <li v-if="!store.currentUser" class="nav-item">
          <router-link to="/signup">Signup</router-link>
        </li>
        <li v-if="store.currentUser != null">
          <router-link to="/food"><v-icon v-if="store.currentUser != null">mdi-hamburger</v-icon>Food</router-link>
        </li>
        <li v-if="store.currentUser != null">
          <router-link to="/drinks"><v-icon v-if="store.currentUser != null">mdi-cup</v-icon>Drinks</router-link>
        </li>
        <li v-if="store.currentUser != null">
          <router-link to="/reservations"><v-icon
              v-if="store.currentUser != null">mdi-book-open-page-variant</v-icon>Reservations</router-link>
        </li>
        <li class="profile-li" v-if="store.currentUser != null">
          <router-link to="/profile"><v-icon v-if="store.currentUser != null">mdi-account</v-icon>Profile</router-link>
        </li>
        <li class="logout-li">
          <a v-if="store.currentUser" href="#" @click.prevent="logout()"><v-icon
              v-if="store.currentUser != null">mdi-logout</v-icon>Logout</a>
        </li>
        <li v-if="store.currentUser != null">

        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
import store from '@/store';
import { firebase } from '../firebase.js';
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.currentUser = user.email;
  }
  else {
    store.currentUser = null;
  }
})

export default {
  name: 'App',
  data() {
    return {
      store,
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace({ name: 'login' });
      })
    },
  }
}

</script>


<style lang="scss">
v-icon {
  padding-right: 5px;
}

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

.profile-li,
.logout-li {
  position: absolute;
}

.profile-li {
  right: 100px;
}

.logout-li {
  right: 10px;
}

body {
  background-color: #DDE6ED;
}

li {
  padding-right: 20px;
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

.dropbtn:hover,
.dropbtn:focus {
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown a:hover {
  background-color: #ddd;
}

.show {
  display: block;
}</style>
