<template>
    <v-card outlined class="reservation_card">
        <v-card-title>Reservations</v-card-title>
        <v-text-field class="no" style="display: inline-block;" placeholder="No. of people:"></v-text-field>
        <v-text-field style="width: 10%; position: absolute; left: 200px;" placeholder="Day"></v-text-field>
        <v-text-field style="width: 10%; position: absolute; left: 300px;" placeholder="Month"></v-text-field>
        <v-text-field style="width: 10%; position: absolute; left: 400px" v-model="currentYear" :disabled="true"></v-text-field>
        <v-text-field style="width: 13%; position: absolute; left: 550px;" placeholder="Time"></v-text-field>
    </v-card>
</template>

<script lang="ts">

export default {
    data (){
        return{
            currentYear: ''
        }
    },
    mounted(){
        this.currentYear = new Date().getFullYear();
    },
    methods:{
    
    }
}
</script>

<style>
.reservation_card{
    width: 50%;
    height: 300px;
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