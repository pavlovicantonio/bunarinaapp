<template>
    <div>
        <v-card style="margin-left: auto; margin-right: auto; margin-top: 50px; height: 200px; width: 400px; background-color: azure; border: 3px solid #068DA9;">
            <v-card-title style="margin-left: 22px;">Reset password</v-card-title>
            <v-text-field type="password" placeholder="Enter your new password" style="width: 80%; margin-left: auto; margin-right: auto;" v-model="newPassword"></v-text-field>
            <v-btn outlined style="margin-left: auto; width: margin-right: auto; background-color: #068DA9; color: white;" @click="resetPassword()">Reset password</v-btn>
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
            newPassword:''
        }
    },
    methods:{
        resetPassword(){
            const auth = firebase.auth();
            const db = firebase.firestore();

            if (auth.currentUser) {
            const user = auth.currentUser;
            const np = this.newPassword;

            user.updatePassword(np)
                .then(() => {
                console.log('Lozinka uspješno promijenjena.');

                const currentUserEmail = user.email;

                if (currentUserEmail) {
                    db.collection('user').where('email', '==', currentUserEmail).get()
                    .then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                        const userDoc = querySnapshot.docs[0];
                        
                        userDoc.ref.update({ password: np })
                            .then(() => {
                            console.log('Lozinka uspješno ažurirana u Firestore bazi podataka.');
                            });
                        }
                    });
                }
                });
            }
            alert("Password changed succesfully!")
            firebase.auth().signOut().then(() => {this.$router.replace({ name: 'login' });
      })
        }
    }
}
</script>
<style>
</style>