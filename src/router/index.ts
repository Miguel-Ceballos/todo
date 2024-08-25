import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/modules/common/layouts/Layout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'tasks' },
      component: Layout,
      children: [
        {
          path: 'tasks',
          name: 'tasks',
          component: () => import('@/modules/tasks/views/TaskView.vue'),
        },
      ],
    },
  ],
});

export default router;
