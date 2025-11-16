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
        redirect: { name: 'tab', params: { tab: 'detalhes' } }
      },
      {
        path: ':tab',
        name: 'tab',
        component: () => import('@/views/AppPage.vue'),
        beforeEnter: (to) => {
          const validTabs = ['detalhes', 'partidas', 'times'];
          const tab = to.params.tab as string;
          
          if (!validTabs.includes(tab)) {
            return { name: 'tab', params: { tab: 'detalhes' } };
          }
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router