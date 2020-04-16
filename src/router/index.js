import Vue from 'vue';
import VueRouter from 'vue-router';
import SingleView from '../views/SingleView.vue';
import GenerationView from '../views/GenerationView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SingleView,
  },
  {
    path: '/generate',
    name: 'Generate',
    component: GenerationView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
