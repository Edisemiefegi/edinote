import { createRouter, createWebHistory } from 'vue-router';

import Auth from './views/Auth.vue'; // Import your Vue components
import Dashboard from './views/Dashboard.Vue'

const routes = [
  {
    path: '/',
    component: Auth,
    name: 'Auth'
  },
  {
    path: '/dashboard',
    component: Dashboard,
    name: 'Dashboard'
  },



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
