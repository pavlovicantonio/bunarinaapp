<template>
    <v-card outlined class="reservation_card">
        <v-card-title>Reservations</v-card-title>
        <v-text-field v-model="numberOfPeople" class="no" style="display: inline-block; padding: 15px; margin-right: 15px;" placeholder="No. of people:"></v-text-field>
        <v-text-field v-model="day" style="width: 10%; padding: 15px; display: inline-block; margin-left: 55px;" placeholder="Day"></v-text-field>
        <v-text-field v-model="month" style="width: 10%; padding: 15px; display: inline-block;" placeholder="Month"></v-text-field>
        <v-text-field style="width: 10%; padding: 15px; display: inline-block;" v-model="currentYear" :disabled="true"></v-text-field>
        <v-text-field v-model="time" style="width: 20%; padding: 15px; display: inline-block" placeholder="Time (e.g. 15:00)"></v-text-field>
        <v-text-field style="width: 25%; padding: 15px; display: inline-block;" v-model="eemail" :disabled="true"></v-text-field>
        <v-btn  @click="saveReservation()" outline color="primary"  style="position: absolute; left: 15px; bottom: 15px; background-color: #3498DB;">Accept
          <v-icon dark right>check_circle</v-icon>
        </v-btn>
        <v-btn @click="cf()" color="primary" dark style="position: absolute; left: 150px; bottom: 15px;">Clear
          <v-icon dark right>remove_circle</v-icon>
        </v-btn>
    </v-card>
</template> 

<script lang="ts">
import store from '../store';
import {firebase} from '../../firebase';

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
            eemail: ''
        }
    },
    methods:{
      cf(){
        this.numberOfPeople = null;
        this.day = null;
        this.month = null;
        this.time = null;
      },
      saveReservation(){
        const reservation = {
          numberOfPeople: this.numberOfPeople,
          year: this.currentUser,
          month: this.month,
          day: this.day,
          time: this.time,
          email: this.currentUser
        };

        firebase.firestore().collection('reservations').add(reservation);
        alert("Your reservation has been saved!");
        this.cf();

      }
    },
    mounted(){
        this.currentYear = new Date().getFullYear();
        this.eemail = store.currentUser;
    }
}
</script>

<style>
.reservation_card{
    width: 50%;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
}

.no{
    width: 15%;
    position: absolute;
    left: 15px;
}
</style>