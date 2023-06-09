<template>
   <div>
    <v-card class="vcard" v-for="item in foodList" :key="item.id">
      <v-card-title>{{ item.naziv }}</v-card-title>
      <v-img style="height: 200px; width: 50%; margin-left: 10px;" :src="item.slika" />
      <v-card-text style="text-align: left; padding-left: 10px;">Price: {{ item.cijena }} €</v-card-text>
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
      foodList: []
    };
  },
  mounted() {
    this.getFoodItems();
  },
  methods: {
    getFoodItems() {
      db.collection("food").orderBy("cijena","desc").get().then((query) => {

        query.forEach(doc => { 
          let data = doc.data();
          this.foodList.push({
            id: doc.id,
            naziv: data.naziv,
            slika: data.slika,
            cijena: data.cijena
        })
        })
      })
    }
  }
};
</script>