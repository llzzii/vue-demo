import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import List from '../components/list.vue'
import Detail from '../components/detail.vue'
import overview from '../components/overview.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: 'home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: overview,
      },
    ],
  },
  {
    path: '/instance/:code',
    component: Home,
    children: [
      {
        path: 'list',
        component: List,
      },
      {
        path: 'detail/:id',
        component: Detail,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

export default router
