import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/AppPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/app/detalhes'
  },
  {
    path: '/app/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: { name: 'detalhes' }
      },
      {
        path: 'detalhes',
        name: 'detalhes',
        component: () => import('@/views/DetalhesPage.vue')
      },
      {
        path: 'partidas', 
        name: 'partidas',
        component: () => import('@/views/PartidasPage.vue')
      },
      {
        path: 'times',
        name: 'times',
        component: () => import('@/views/TimesPage.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
