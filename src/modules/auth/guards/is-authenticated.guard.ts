import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { AuthStatus } from '@/modules/auth/interfaces/auth-status.enum';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  // console.log(from)
  await authStore.checkAuthStatus();

  console.log(authStore.authStatus);
  authStore.authStatus === AuthStatus.NotAuthenticated ? next({name: 'welcome'}) : next();
};

export default isAuthenticatedGuard;
