<template>
    <v-sheet class="mx-auto">
      <h1>Signup</h1>
      <v-form fast-fail @submit.prevent>

        <v-row>
            <v-col sm="10">
            <v-text-field
            v-model="firstname"
            label="First name"
          ></v-text-field>
        </v-col>
        </v-row>

        <v-row>
            <v-col sm="10">
            <v-text-field
            v-model="lastname"
            label="Last name"
          ></v-text-field>
        </v-col>
        </v-row>

        <v-row class="row">
          <v-col sm="10">
          <v-text-field
            v-model="email"
            label="E-mail"
            :rules="emailRules"
          ></v-text-field>
          </v-col>
        </v-row>
  
        <v-row>
          <v-col sm="10">
            <v-text-field
              v-model="password"
              label="Password" 
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
           </v-col>
        </v-row>
        <p>Already a member? <router-link to="login">Login!</router-link></p>
        <v-btn type="button" class="mt-2" @click="signup()">SIGNUP</v-btn>
      </v-form>
    </v-sheet>
  </template>
  
  <script>
  import {firebase} from '../../firebase';

    export default {
      name: 'SignupView',
      data () {
        return {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          emailUsage: false,
        };
      },
      methods:  {
        signup(){
          firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(() => {
            alert("Registration successfully!");
            this.$router.replace({name:'home'})
          }).catch(function(error){console.error("An error occurred during registration", error);});
          this.saveUser();
          this.clear_d();
        },

        saveUser() {
          const db = firebase.firestore();
          const usersCollection = db.collection('user');

          // Create a new user object
          const user = {
            firstName: this.firstname,
            lastName: this.lastname,
            email: this.email,
            password: this.password
          };

          // Save the user to Firestore
          usersCollection.add(user);
        },
        clear_d(){
          this.firstname = null,
          this.lastname = null,
          this.email = null,
          this.password = null;
        },
        
      }
    }
  </script>
  
  <style scoped>
  h1{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .mx-auto{
    margin-left: auto;
    margin-right: auto;
    width: 30%;
    height: 580px;
    margin-top: 50px;
    border-top-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  
  .row{
    margin-left: auto;
    margin-right: auto;
  }
  
  .mt-2{
    width: 20%;
  }
  .mt-2:hover{
    background-color: #068DA9;
    color: white;
  }
  
  p{
    padding-top: 15px;
    padding-bottom: 15px;
  }
  </style>