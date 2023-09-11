import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ProfileView from '../views/ProfileView.vue'
import FoodView from '../views/FoodView.vue'
import DrinksView from '../views/DrinksView.vue'
import ReservationsView from '../views/ReservationsView'
import ResetPasswordView from '../views/ResetPasswordView'
import ResetEmailView from '../views/ResetEmailView'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/food',
    name: 'food',
    component: FoodView
  },
  {
    path: '/drinks',
    name: 'drinks',
    component: DrinksView
  },
  {
    path: '/reservations',
    name: 'reservations',
    component: ReservationsView
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: ResetPasswordView
  },
  {
    path: '/resetemail',
    name: 'resetemail',
    component: ResetEmailView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
