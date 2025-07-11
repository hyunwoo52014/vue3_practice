import Login from '@/views/Auth/Login.vue';
import DashBoard from '@/views/DashBoard/DashBoard.vue';
import List from '@/views/Lecture/List.vue';
import NotFound from '@/views/NotFound/NotFound.vue';
import Notice from '@/views/Support/Notice.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/vue',
      component: DashBoard,
      children: [
        {
          path: 'lecture',
          name: 'lecture',
          children: [
            {
              path: 'list',
              name: 'list',
              component: List,
            },
          ],
        },
        {
          path: 'support',
          name: 'support',
          children: [
            {
              path: 'notice',
              name: 'notice',
              component: Notice,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
