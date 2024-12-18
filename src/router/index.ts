import { createRouter, createWebHistory } from 'vue-router'
import DragonPreview from '@/views/DragonPreview.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dragon',
      component: DragonPreview,
    },
  ],
})

export default router
