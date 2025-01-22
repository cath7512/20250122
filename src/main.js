import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import UserAuth from './components/UserAuth.vue';
import UserSignUp from './components/UserSignup.vue';

const routes = [
  { path: '/', component: UserAuth },
  { path: '/signup', component: UserSignUp }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App)
  .use(router) // Use the router
  .mount('#app'); 