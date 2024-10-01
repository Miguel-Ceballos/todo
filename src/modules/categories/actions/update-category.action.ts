import type { Category } from '@/modules/categories/interfaces/category.interface';
import type { ResponseError } from '@/modules/categories/interfaces/categories-list.response';
import { todoApi } from '@/api/tasksApi';
import { isAxiosError } from 'axios';

export const updateCategoryAction = async (form: Category): Promise<Category | ResponseError> => {
  try {
    return await todoApi.patch(`/categories/${form.id}`, {
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
