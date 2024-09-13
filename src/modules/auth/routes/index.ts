import type { RouteRecordRaw } from 'vue-router';
import isNotAuthenticatedGuard from '@/modules/auth/guards/is-not-authenticated.guard';

export const authRoutes: RouteRecordRaw = {
  path: '/auth',
  name: 'Auth',
  component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
  children: [
    {
      path: 'login',
      name: 'login',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/modules/auth/views/LogInView.vue'),
    },
    {
      path: 'register',
      name: 'register',
      beforeEnter: [isNotAuthenticatedGuard],
      component: () => import('@/modules/auth/views/RegisterView.vue'),
    },
  ],
};
