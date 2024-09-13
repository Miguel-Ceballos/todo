<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { AuthStatus } from '@/modules/auth/interfaces/auth-status.enum';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore();

const route = useRoute();
const router = useRouter();

authStore.$subscribe(
  (_, state) => {
    if (state.authStatus === AuthStatus.Checking) {
      authStore.checkAuthStatus();
      return;
    }

    // if (route.path.includes('/tasks') && state.authStatus === AuthStatus.NotAuthenticated) {
    //   router.replace({ name: 'welcome' });
    //   return;
    // }

    if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
      router.replace({ name: 'home' });
      return;
    }
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <RouterView />
</template>
