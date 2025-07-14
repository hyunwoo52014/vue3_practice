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
            {
              path: 'test-info',
              name: 'test-info',
              component: null,
            },
            {
              path: 'lecture-manage-list',
              name: 'lecture-manage-list',
              component: null,
            },
          ],
        },
        {
          path: 'support',
          name: 'support',
          children: [
            {
              path: 'qna',
              name: 'qna',
              component: null,
            },
            {
              path: 'notice',
              name: 'notice',
              component: Notice,
            },
            {
              path: 'learning-materials',
              name: 'learning-materials',
              component: null,
            },
            {
              path: 'lecture-survey',
              name: 'lecture-survey',
              component: null,
            },
            {
              path: 'manage-survey',
              name: 'manage-survey',
              component: null,
            },
          ],
        },
        {
          path: 'manage',
          name: 'manage',
          children: [
            {
              path: 'student',
              name: 'student',
              component: null,
            },
            {
              path: 'tutor',
              name: 'tutor',
              component: null,
            },
            {
              path: 'counsel',
              name: 'counsel',
              component: null,
            },
            {
              path: 'recruit',
              name: 'recruit',
              component: null,
            },
          ],
        },
        {
          path: 'system',
          name: 'system',
          children: [
            {
              path: 'commoncode',
              name: 'commoncode',
              component: null,
            },
            {
              path: 'classroom',
              name: 'classroom',
              component: null,
            },
            {
              path: 'equipment',
              name: 'equipment',
              component: null,
            },
            {
              path: 'company',
              name: 'company',
              component: null,
            },
          ],
        },
        {
          path: 'user',
          name: 'user',
          children: [
            {
              path: 'statistics',
              name: 'statistics',
              component: null,
            },
            {
              path: 'resume',
              name: 'resume',
              component: null,
            },
          ],
        },
      ],
    },
  ],
});

export default router;
