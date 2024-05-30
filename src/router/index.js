import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Episode from '../components/Episode.vue';
import Character from '../components/Character.vue';
import Location from '../components/Location.vue';
import EpisodeDetail from '../components/EpisodeDetail.vue';
import CharacterDetail from '../components/CharacterDetail.vue';
import LocationDetail from '../components/LocationDetail.vue';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/episode/:id',
    name: 'episode',
    component: EpisodeDetail
  },
  {
    path: '/character/:id',
    name: 'character',
    component: CharacterDetail
  },
  {
    path: '/location/:id',
    name: 'location',
    component: LocationDetail
  },
 {
    path: '/episodes',
    name: 'episodes',
    component: Episode
  },
  {
    path: '/characters',
    name: 'characters',
    component: Character
  },
  {
    path: '/locations',
    name: 'locations',
    component: Location
  }
 ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
