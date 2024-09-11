import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/modules/common/layouts/Layout.vue';
import { authRoutes } from '@/modules/auth/routes';

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
        {
          path: 'tasks/:id',
          name: 'category-tasks',
          component: () => import('@/modules/categories/views/CategoryTasksView.vue'),
        },
        {
          path: 'tasks/completed',
          name: 'completed-tasks',
          component: () => import('@/modules/tasks/views/PendingTasksView.vue'),
        },
      ],
    },
    // Auth Routes
    authRoutes,
  ],
});

export default router;
