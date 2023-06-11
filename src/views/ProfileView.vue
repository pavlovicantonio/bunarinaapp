<template>
    <v-card class="profile_card">
        <v-card-title>Profile</v-card-title>
        <v-table>
            <t-body>
                <tr>
                    <td style="text-align: left;">First name:</td>
                    <td><v-text-field v-model="user.firstName"></v-text-field></td>
                </tr>
                <tr>
                    <td>Last name:</td>
                    <td><v-text-field></v-text-field></td>
                </tr>
                <tr>
                    <td>E-mail:</td>
                    <td><v-text-field v-model="store.currentUser" disabled></v-text-field></td>
                </tr>
                <tr>
                    <td>Password:</td>
                    <td><v-text-field v-model="store.currentUserPassword"></v-text-field></td>
                </tr>
            </t-body>
        </v-table>
    </v-card>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: ''
            }
        };
    },
    mounted() {
        this.getCurrentUser();
    },
    methods: {
        getCurrentUser() {
            const currentUser = firebase.auth().currentUser;
            if (currentUser) {
                const { displayName, email } = currentUser;

                // Ako displayName ima format "Ime Prezime", razdvojite ga na ime i prezime
                const [firstName, lastName] = displayName.split(' ');

                this.user.firstName = firstName;
                this.user.lastName = lastName;
                this.user.email = email;
                this.user.password = '********';
            }
        }
    }
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
}
</style>