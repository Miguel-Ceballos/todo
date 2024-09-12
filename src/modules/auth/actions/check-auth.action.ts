import { authApi, todoApi } from '@/modules/tasks/api/tasksApi';
import { isAxiosError } from 'axios';

export const checkAuthAction = async () => {
  try {
    const localToken = localStorage.getItem('token');
    if (!localToken) {
      return {ok: false}
    }
    const response = await authApi.get('/user');
    if (response.data.data.attributes){
      return {
        ok: true,
        token: localToken,
      }
    } else {
      return {
        ok: false,
      }
    }
  } catch (e) {
    if (isAxiosError(e) && reponse.data.status === 401) {
      return {
        ok: false,
      };
    }
  }
};
