import { createWebHashHistory, createRouter } from 'vue-router'
const routes = [
  { 
    path: '/',
    component:() => import('../components/word/Words.vue')
  },
  {
    path: '/gram',
    component:() => import('../components/gram/Gram.vue')
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