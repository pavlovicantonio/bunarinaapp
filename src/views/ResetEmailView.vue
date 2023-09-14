<template>
    <div>
        <v-card style="margin-left: auto; margin-right: auto; margin-top: 50px; height: 200px; width: 400px; background-color: azure; border: 3px solid #068DA9;">
            <v-card-title style="margin-left: 22px;">Reset email</v-card-title>
            <v-text-field type="email" placeholder="Enter your new email" style="width: 80%; margin-left: auto; margin-right: auto;" v-model="newEmail"></v-text-field>
            <v-btn outlined style="margin-left: auto; width: margin-right: auto; background-color: #068DA9; color: white;" @click="resetEmail()">Reset email</v-btn>
        </v-card>
    </div>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export default{
    data(){
        return{
            newEmail:'',
        }
    },
    methods:{
        resetEmail(){
            if(this.newEmail.includes('@') == false){
                alert("Email should contain @!")
                return;
            }
            const auth = firebase.auth();
            const db = firebase.firestore();

            if (auth.currentUser) {
            const user = auth.currentUser;
            const ne = this.newEmail;
            
            
            db.collection('user').where('email', '==', auth.currentUser.email).get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        
                        userDoc.ref.update({ email: ne })
                            .then(() => {
                            console.log('Email uspješno ažuriran u Firestore bazi podataka.');
                            });
                        }
                    });
            user.updateEmail(ne)
            }
            alert("Email changed succesfully!")
            firebase.auth().signOut().then(() => {this.$router.replace({ name: 'login' });
      })
        },
    }

}
</script>
<style>
</style>