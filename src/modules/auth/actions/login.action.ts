import { authApi } from '@/modules/tasks/api/tasksApi';
import type { AuthResponse } from '@/modules/auth/interfaces/auth.response';
import { isAxiosError } from 'axios';
import { useValidationErrorsStore } from '@/modules/common/stores/validation-errors.store';

const errorsStore = useValidationErrorsStore()

export const loginAction = async (form) => {
  try {
    const response = await authApi.post<AuthResponse>('/login', {
      email: form.email,
      password: form.password,
    });

    if (response.data.errors) {
      errorsStore.getErrors(response);
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