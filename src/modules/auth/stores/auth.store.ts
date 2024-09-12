import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthStatus } from '@/modules/auth/interfaces/auth-status.enum';
import { loginAction } from '@/modules/auth/actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const authStatus = ref(AuthStatus.Checking);
  const authenticated = ref(Boolean);
  const token = ref(useLocalStorage('token', ''));

  const LoginForm = reactive(<LoginParameters>{ email: '', password: '' });
  const RegisterForm = reactive(<RegisterParameters>{});

  interface LoginParameters {
    email: string;
    password: string;
  }

  interface RegisterParameters {
    name: string;
    email: string;
    password: string;
  }

  const login = async (form: LoginParameters) => {
    try {
      const loginResponse = await loginAction(form);
      if (!loginResponse.ok) {
        logout();
        return false;
      }
      token.value = loginResponse.token;
      authStatus.value = AuthStatus.Authenticated;
      await router.push({ name: 'home' });
      return true;
    } catch (error) {
      console.log(error);
      return logout();
    }
  };

  const logout = () => {
    authStatus.value = AuthStatus.NotAuthenticated;
    token.value = '';
    return false;
  };

  // const getData = async () => {
  //   await
  // }

  return {
    LoginForm,
    RegisterForm,
    authenticated,
    authStatus,

    //Getters
    isChecking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),

    //Actions
    login,
  };
});
