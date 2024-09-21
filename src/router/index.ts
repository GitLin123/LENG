import { createWebHashHistory, createRouter } from 'vue-router'
import Word from '../components/Words.vue'
import Gram from '../components/Gram.vue'
import Talk from '../components/Talk.vue'
import Home from '../components/Home.vue'
const routes = [
  { 
    path: '/',
    component:Word
  },
  {
    path: '/gram',
    component:Gram
  },
  {
    path: '/talk',
    component:Talk
  },
  {
    path: '/home',
    component:Home
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})