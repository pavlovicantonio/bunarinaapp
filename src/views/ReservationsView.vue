<template>
  <div>
    <v-card class="reservation_card">
        <v-card-title>Reservations</v-card-title>
        <v-text-field v-model="numberOfPeople" class="no" style="display: inline-block; padding: 15px; margin-right: 15px;" placeholder="No. of people:" required></v-text-field>
        <v-text-field v-model="day" style="width: 10%; padding: 15px; display: inline-block; margin-left: 55px;" placeholder="Day" required></v-text-field>
        <v-text-field v-model="month" style="width: 10%; padding: 15px; display: inline-block;" placeholder="Month" required></v-text-field>
        <v-text-field style="width: 10%; padding: 15px; display: inline-block;" v-model="currentYear" :disabled="true"></v-text-field>
        <v-text-field v-model="time" style="width: 20%; padding: 15px; display: inline-block" placeholder="Time (e.g. 15:00)" required></v-text-field>
        <v-text-field style="width: 25%; padding: 15px; display: inline-block;" v-model="email" :disabled="true"></v-text-field>                                     
        <v-btn  @click="saveReservation()" outline color="primary"  style="position: absolute; left: 15px; bottom: 15px; background-color: #3498DB;">Accept
          <v-icon dark right>check_circle</v-icon>
        </v-btn>
        <v-btn @click="cf()" color="primary" dark style="position: absolute; left: 150px; bottom: 15px;">Clear
          <v-icon dark right>remove_circle</v-icon>
        </v-btn>
    </v-card>
    <v-card class="profile_card" v-for="attribute in attributes" :key="attribute.id" style="background-color: #75C2F6; margin-bottom: 15px;">
      <v-card-title style="font-weight: bold;">Reservation</v-card-title>
      <v-card class="reservation">
        <v-card-text>
          Email: {{ attribute.email }}
          <br>
          Date: {{ formatDate(attribute.date) }}
          <br>
          Number of people: {{ attribute.numberOfPeople }}
        </v-card-text>
      </v-card>
      <v-btn  @click="deleteReservation(attribute.uid)" outlined style="background-color: #D21312; color: white; border: 1px solid #D21312; margin-left:478px; margin-top: 20px;">Cancel reservation 
            <v-icon dark right>cancel</v-icon>
      </v-btn>
    </v-card>
  </div>
</template> 

<script lang="ts">
import store from '../store';
import {firebase} from '../../firebase';
import { format } from 'date-fns';
import emailjs from 'emailjs-com';

export default {
  async beforeMount() {
      await this.fetchReservation();
  },
    data (){
        return{
            currentYear: new Date().getFullYear(),
            numberOfPeople: '',
            day: '',
            month: '',
            time: '',
            email: store.currentUser,
            store,
            attributes: [],
        }
    },
    methods:{
      cf(){
        this.numberOfPeople = null;
        this.day = null;
        this.month = null;
        this.time = null;
      },
    
      async saveReservation(){
        const existingReservation = await firebase.firestore().collection('reservations')
        .where('email', '==', this.store.currentUser)
        .get();

        if (!existingReservation.empty) {
        
          alert("You already have an active reservation. You cannot add a new one.");
          this.cf();
          return;
        }

        const year = parseInt(this.currentYear);
        const month = parseInt(this.month) - 1;
        const day = parseInt(this.day);
        const time = parseInt(this.time);

        firebase.firestore().collection('reservations').add({
          email: this.store.currentUser,
          date: firebase.firestore.Timestamp.fromDate(new Date(year,month,day,time)),
          numberOfPeople: this.numberOfPeople
        }).then(() => {
            alert("Your reservation has been successfully saved!")
          }).catch((error)=>{
            alert("Your reservation has not been saved! Try again!"+ error)
          });

        const templateParams = {
            email: this.store.currentUser,
            date: (this.day+"-"+this.month+"-"+this.currentYear),
            time: this.time,
            numberOfPeople: this.numberOfPeople,
          };

        emailjs.send("service_6rpv5ja", "template_fd795e9", templateParams, "P8lrANXaKfOvV-_KN").then(response => {
          console.log("Email uspješno poslat!", response);
        }).catch(error => {
          console.error("Greška prilikom slanja emaila:", error);
        });
          this.cf();
          this.fetchReservation();
      },

      async fetchReservation() {
        try {
        const querySnapshot = await firebase.firestore().collection('reservations').where('email', '==', store.currentUser).get();
        
        const attributes = querySnapshot.docs.map(doc => {
          const attribute = doc.data();
          attribute.uid = doc.id; // Add the UID to the attribute object
          return attribute;
        });

      this.attributes = attributes;
      } catch (error) {
      console.error('Error retrieving attributes:', error);
      } 
    },

    formatDate(date) {
      return format(date.toDate(), 'EEE MMM dd yyyy HH:mm:ss'); // Formatiranje datuma pomoću date-fns
    },

    async deleteReservation(reservationId) {
      try {
        await firebase.firestore().collection('reservations').doc(reservationId).delete();
        alert("Reservation canceled successfully!");

        const templateParams = {
          email: store.currentUser,
        };

        await emailjs.send("service_6rpv5ja", "template_rpkyw5j", templateParams, "P8lrANXaKfOvV-_KN").then(response => {
            console.log("Email uspješno otkazan!", response);
          }).catch(error => {
            console.error("Greška prilikom slanja emaila:", error);
          });      

      } catch (error) {
        console.error('Error canceling reservation:', error);
        alert("Failed to cancel reservation. Please try again.");
      }
        this.fetchReservation();
    },
  }
}
</script>

<style>
.reservation{
  width: 97%;
}
.reservation_card{
    width: 50%;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
}
.reservationsInfo{
  width: 50%;
  height: 100px;
  margin-left: auto;
  margin-right: auto;
}
.no{
    width: 15%;
    position: absolute;
    left: 15px;
}
</style>