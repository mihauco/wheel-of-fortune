import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: IntroView
    },
    {
      path: '/players',
      name: 'players',
      component: () => import('../views/PlayersView.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue')
    }
  ]
})

export default router
