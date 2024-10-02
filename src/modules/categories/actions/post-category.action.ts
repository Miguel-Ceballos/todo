import { todoApi } from '@/api/tasksApi';
import { isAxiosError } from 'axios';
import type { Category } from '@/modules/tasks/interfaces/task.interface';
import type {
  Error,
  ResponseError,
  SuccessPostCategoryResponse,
} from '@/modules/categories/interfaces/categories-list.response';

export const postCategoryAction = async (
  form: Category,
): Promise<SuccessPostCategoryResponse | ResponseError | Error[]> => {
  try {
    return await todoApi.post(`/categories/`, {
      data: {
        type: 'categories',
        attributes: {
          title: form.title,
        },
      },
    });
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
