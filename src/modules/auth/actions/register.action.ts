import { authApi } from '@/modules/tasks/api/tasksApi';
import type { AuthErrors, AuthResponse } from '@/modules/auth/interfaces/auth.response';
import { isAxiosError } from 'axios';
import type { RegisterParameters } from '@/modules/auth/stores/auth.store';


export const registerAction = async (form: RegisterParameters) => {
  try {
    const response = await authApi.post<AuthResponse|AuthErrors>('/register', {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (response.data.errors) {
      console.log(response.data.errors);
      return;
    }

    return {
      ok: true,
      token: response.data.data.token,
    };
  } catch (e) {
    if (isAxiosError(e) && e.status === 401) {
      return {
        ok: false,
        message: 'Email or password is incorrect',
      };
    }
    console.log(e);
    throw new Error('No se pudo realizar la petición.');
  }
};