import { createWebHashHistory, createRouter } from 'vue-router'
const routes = [
  { 
    path: '/',
    component:() => import('../components/first/index.vue')
  },
  {
    path: '/gram',
    component:() => import('../components/first/gram/Gram.vue')
  },
  {
    path: '/talk',
    component:() => import('../components/talk/Talk.vue')
  },
  {
    path: '/home',
    component:() => import('../components/home/Home.vue')
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})