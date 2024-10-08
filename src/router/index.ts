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
  {
    path: '/read',
    component:() => import('../components/read/index.vue')
  },
  {
    path: '/broad',
    component:() => import('../components/broadcast/index.vue')
  },
  
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})