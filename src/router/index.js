import Vue from 'vue';
import VueRouter from 'vue-router';
import SingleView from '../views/SingleView.vue';
import MultiView from '../views/MultiView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/single',
    name: 'Single',
    component: SingleView,
  },
  {
    path: '/multi',
    name: 'Multi',
    component: MultiView,
  },
  {
    path: '/',
    redirect: '/single',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
