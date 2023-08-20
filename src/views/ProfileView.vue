<template>
    <div>
    <v-card class="profile_card">
      <v-card-title style="font-weight: bold;">User profile</v-card-title>
      <div v-for="attribute in attributes" :key="attribute.uid">
       First name:<v-text-field style="width: 35%; display: inline-block; margin-left: 15px;" v-model="attribute.firstName"></v-text-field>
        <br>
       Last name:<v-text-field style="width: 35%; display: inline-block; margin-left: 15px;" v-model="attribute.lastName"></v-text-field>
        <br>
       Email:<v-text-field style="width: 39%; display: inline-block; margin-left: 15px;" v-model="attribute.email"></v-text-field>
        <br>
       Password:<v-text-field :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword" style="width: 35%; display: inline-block; margin-left: 15px;" v-model="attribute.password"></v-text-field>
      </div>
      <br>
      <v-btn  @click="deleteAcc()" outlined style="background-color: #D21312; color: white;">Delete account
            <v-icon dark right>delete</v-icon>
        </v-btn>
  </v-card>
  </div>
  </template>
  
  <script>
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import 'firebase/firestore';
  import store from '../store';
  
  export default {
    data() {
      return {
        attributes: [],
        showPassword: false
      };
    },
    methods: {
      
      fetchData() {
        const db = firebase.firestore();
        db.collection('user') // Replace 'your-collection' with the actual name of your collection
          .where('email', '==', store.currentUser) // Replace 'oneVariable' with the name of the field you want to match
          .get()
          .then(querySnapshot => {
            const attributes = [];
            querySnapshot.forEach(doc => {
              const attribute = doc.data(); // Retrieve the attribute data
              attributes.push(attribute);
            });
            this.attributes = attributes; // Update the component's data with the retrieved attributes
          })
          .catch(error => {
            console.error('Error retrieving attributes:', error);
          });
      },
      deleteAcc(){
        const user = firebase.auth().currentUser;
        user.delete().then(()=>{this.$router.push({name:'signup'}); alert("Account successfully deleted!")}).catch((error)=>{alert(error," An error occurred! Try again!")});
        const userCollection = firebase.firestore().collection('user');
        const query = userCollection.where('email', '==', store.currentUser);
  
        query.get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref.delete().then(() => {
              console.log('Document successfully deleted!');
            }).catch((error) => {
              console.error('Error removing document: ', error);
            });
          });
        }).catch((error) => {
          console.error('Error getting documents: ', error);
        });
      },
    },
    created() {
      this.fetchData();
    },
    
  };
  </script>
  
  
  <style>
  .profile_card {
      width: 50%;
      height: auto;
      background-color: azure;
      margin-left: auto;
      margin-right: auto;
      margin-top: 15px;
      text-align: left;
      padding-left: 20px;
      padding-bottom: 20px;
  }
  </style>