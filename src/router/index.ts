import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/modules/common/layouts/Layout.vue';
import { authRoutes } from '@/modules/auth/routes';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import isNotAuthenticatedGuard from '@/modules/auth/guards/is-not-authenticated.guard';
import AuthLayout from '@/modules/auth/layouts/AuthLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tasks',
      name: 'home',
      redirect: { name: 'tasks' },
      beforeEnter: [isAuthenticatedGuard],
      component: Layout,
      children: [
        {
          path: 'all',
          name: 'tasks',
          component: () => import('@/modules/tasks/views/TaskView.vue'),
        },
        {
          path: '/:id',
          name: 'category-tasks',
          component: () => import('@/modules/categories/views/CategoryTasksView.vue'),
        },
        {
          path: 'completed',
          name: 'completed-tasks',
          component: () => import('@/modules/tasks/views/PendingTasksView.vue'),
        },
      ],
    },
    // Auth Routes
    authRoutes,
    {
      path: '/',
      name: 'welcome-layout',
      component: AuthLayout,
      redirect: {name: 'welcome'},
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          beforeEnter: [isNotAuthenticatedGuard],
          component: () => import('@/modules/auth/views/WelcomeView.vue')
        }
      ]
    },
  ],
});

export default router;
