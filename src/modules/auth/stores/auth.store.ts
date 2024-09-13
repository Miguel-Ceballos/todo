import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthStatus } from '@/modules/auth/interfaces/auth-status.enum';
import { checkAuthAction, loginAction } from '@/modules/auth/actions';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const authStatus = ref(AuthStatus.Checking);
  const authenticated = ref(Boolean);
  const token = ref('');

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
      localStorage.setItem('token', loginResponse.token);
      token.value = localStorage.getItem('token');
      authStatus.value = AuthStatus.Authenticated;
      return true;
    } catch (error) {
      console.log(error);
      return logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatus.NotAuthenticated;
    token.value = '';
    return false;
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();
      if (!statusResp.ok) {
        logout();
        return false;
      }
      authStatus.value = AuthStatus.Authenticated;
      token.value = statusResp.token;
    } catch (e) {
      logout();
      return false;
    }
  };

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
    logout,
    checkAuthStatus,
  };
});
