import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { AuthStatus } from '@/modules/auth/interfaces/auth-status.enum';

const isNotAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const authStore = useAuthStore();
  // console.log(from)
  await authStore.checkAuthStatus();

  authStore.authStatus === AuthStatus.Authenticated ? next({ name: 'home' }) : next();
};

export default isNotAuthenticatedGuard;
