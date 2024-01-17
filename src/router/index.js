import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/collection',
    name: 'collection',
    component: () => import('../views/Collection.vue')
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchNewManga.vue')
  }, 
  {
    path: '/manga/:id',
    name: 'single manga',
    component: () => import('../views/Manga.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
