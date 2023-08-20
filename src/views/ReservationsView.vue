<template>
  <div>
    <v-card class="reservation_card" outlined>
        <v-card-title>Reservations</v-card-title>
        <v-text-field v-model="numberOfPeople" class="no" style="display: inline-block; padding: 15px; margin-right: 15px;" placeholder="No. of people:" required></v-text-field>
        <v-text-field v-model="day" style="width: 10%; padding: 15px; display: inline-block; margin-left: 55px;" placeholder="Day" required></v-text-field>
        <v-text-field v-model="month" style="width: 10%; padding: 15px; display: inline-block;" placeholder="Month" required></v-text-field>
        <v-text-field style="width: 10%; padding: 15px; display: inline-block;" v-model="currentYear" :disabled="true"></v-text-field>
        <v-text-field v-model="time" style="width: 20%; padding: 15px; display: inline-block" placeholder="Time (e.g. 15:00)" required></v-text-field>
        <v-text-field style="width: 25%; padding: 15px; display: inline-block;" v-model="eemail" :disabled="true"></v-text-field>
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
      <v-btn  @click="deleteReservation(attribute.uid)" outlined style="background-color: #D21312; color: white; border: 1px solid #D21312; margin-top: 15px; margin-left: 478px;">Delete reservation 
            <v-icon dark right>delete</v-icon>
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
    data (){
        return{
            currentYear: '',
            numberOfPeople: '',
            day: '',
            month: '',
            time: '',
            email: '',
            store,
            eemail: '',
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
        const hasExistingReservation = await this.checkExistingReservation();
        if (hasExistingReservation) {
          alert("You already have an active reservation.");
          return;
        }
        const year = parseInt(this.currentYear);
        const month = parseInt(this.month) - 1; // Months are zero-based (0 to 11)
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
          this.cf();
          this.fetchReservation();
          this.sendReservationEmail();

      },
      async fetchReservation() {
        try {
      const querySnapshot = await firebase.firestore().collection('reservations')
        .where('email', '==', store.currentUser)
        .get();

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
  async sendReservationEmail() {
    const year = parseInt(this.currentYear);
        const month = parseInt(this.month) - 1; // Months are zero-based (0 to 11)
        const day = parseInt(this.day);
        const time = parseInt(this.time);
        
        const date = firebase.firestore.Timestamp.fromDate(new Date(year,month,day,time));
      const emailContent = {
        to: 'antoniopavlovic20@gmail.com', // Replace with recipient's email
        from: this.store.currentUser, // Replace with your email
        subject: 'New Reservation',
        text: `New reservation details:
        Email: ${this.store.currentUser}
        Date: ${date},
        Number of People: ${this.numberOfPeople}`,
      };

      try {
        const response = await emailjs.send(
          'service_6rpv5ja', // Replace with your EmailJS service ID
          'template_fd795e9', // Replace with your EmailJS template ID
          emailContent,
          'P8lrANXaKfOvV-_KN' // Replace with your EmailJS user ID
        );

        console.log('Email sent successfully:', response.text);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    },
    formatDate(date) {
      return format(date.toDate(), 'EEE MMM dd yyyy HH:mm:ss'); // Formatiranje datuma pomoću date-fns
    },
    async checkExistingReservation() {
    try {
      const querySnapshot = await firebase.firestore().collection('reservations')
        .where('email', '==', this.store.currentUser)
        .where('completed', '==', false)
        .get();

      return !querySnapshot.empty; // Vratite true ako postoji aktivna rezervacija, inače false
    } catch (error) {
      console.error('Error checking existing reservation:', error);
      return false;
    }
  },
  
  async deleteReservation(reservationId) {
    try {
      await firebase.firestore().collection('reservations').doc(reservationId).delete();
      alert("Reservation deleted successfully!");

      // Fetch reservations again after deleting
      await this.fetchReservation();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      alert("Failed to delete reservation. Please try again.");
    }
  },
    },
    mounted(){
        this.currentYear = new Date().getFullYear();
        this.eemail = store.currentUser;
        this.fetchReservation();
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