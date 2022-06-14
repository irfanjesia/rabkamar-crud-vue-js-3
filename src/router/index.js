//import vue router
import {createRouter, createWebHistory} from 'vue-router';

//define a routes
const routes = [
  {
    path: '/',
    name: 'order.index',
    component: () =>
      import (/* webpackChunkName: "order.index" */ '@/views/order/Index.vue'),
  },
  {
    path: '/view',
    name: 'order.view',
    component: () =>
      import (/* webpackChunkName: "order.view" */ '@/views/order/View.vue'),
  },
  {
    path: '/create',
    name: 'order.create',
    component: () =>
      import (
        /* webpackChunkName: "order.create" */ '@/views/order/Create.vue'
      ),
  },
  {
    path: '/edit/:id',
    name: 'order.edit',
    component: () =>
      import (/* webpackChunkName: "order.edit" */ '@/views/order/Edit.vue'),
  },
];

//create router
const router = createRouter ({
  history: createWebHistory (),
  routes, // config routes
});

export default router;
