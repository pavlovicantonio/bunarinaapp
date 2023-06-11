<template>
    <div>
     <v-card class="vcard">
        <v-card-title style="font-weight: bold; font-size: 25px;">Hot Drinks and coffee</v-card-title>
        <div v-for="item in sortedHotDrinks" :key="item.naziv">
            <v-card-title>{{ item.naziv }}</v-card-title>
            <v-card-text style="text-align: left;">Price: {{ item.cijena }} €</v-card-text>
        </div>
     </v-card>
     <v-card class="vcard">
        <v-card-title style="font-weight: bold; font-size: 25px;">No alcohol drinks</v-card-title>
        <div v-for="item in sortednoAlcoholDrinks" :key="item.naziv">
            <v-card-title>{{ item.naziv }}</v-card-title>
            <v-card-text style="text-align: left;">Price: {{ item.cijena }} €</v-card-text>
        </div>
     </v-card>
     <v-card class="vcard">
        <v-card-title style="font-weight: bold; font-size: 25px;">Shots</v-card-title>
        <div v-for="item in sortedShotsDrinks" :key="item.naziv">
            <v-card-title>{{ item.naziv }}</v-card-title>
            <v-card-text style="text-align: left;">Price: {{ item.cijena }} €</v-card-text>
        </div>
     </v-card>
     <v-card class="vcard">
        <v-card-title style="font-weight: bold; font-size: 25px;">Beer</v-card-title>
        <div v-for="item in sortedBeerDrinks" :key="item.naziv">
            <v-card-title>{{ item.naziv }}</v-card-title>
            <v-card-text style="text-align: left;">Price: {{ item.cijena }} €</v-card-text>
        </div>
     </v-card>
   </div>
 </template>
 
 <style>
   .vcard{
     width: 50%; 
     height: auto; 
     background-color: azure; 
     margin-left: auto; 
     margin-right: auto; 
     margin-top: 15px;
     }
 </style>
 
 <script>
 import {db} from '../../firebase';
 
 export default {
   data() {
     return {
       drinksList: []
     };
   },
   mounted() {
     this.getDrinkItems();
   },
   computed: {
    sortedHotDrinks() {
      return this.drinksList
        .filter(item => item.tip === 'hotDrinks')
        .sort((a, b) => a.tip.localeCompare(b.tip));
    },
    sortednoAlcoholDrinks() {
      return this.drinksList
        .filter(item => item.tip === 'noAlcoholDrinks')
        .sort((a, b) => a.tip.localeCompare(b.tip));
    },
    sortedShotsDrinks() {
      return this.drinksList
        .filter(item => item.tip === 'shots')
        .sort((a, b) => a.tip.localeCompare(b.tip));
    },
    sortedBeerDrinks() {
      return this.drinksList
        .filter(item => item.tip === 'beer')
        .sort((a, b) => a.tip.localeCompare(b.tip));
    }
  },
   methods: {
     getDrinkItems() {
       db.collection("drinks").orderBy("cijena","desc").get().then((query) => {
 
         query.forEach(doc => { 
           let data = doc.data();
           this.drinksList.push({
             id: doc.id,
             naziv: data.naziv,
             cijena: data.cijena,
             tip: data.tip
         })
         })
       })
     }
   }
 };
 </script>