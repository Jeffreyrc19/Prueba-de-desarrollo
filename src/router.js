import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import MovieDetails from './views/MovieDetails.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: MovieDetails
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router