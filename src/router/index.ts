import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/Views/Login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/Views/Main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/Views/Notfound/index.vue')
    }
  ]
})

export default router
