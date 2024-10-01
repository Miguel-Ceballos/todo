import { todoApi } from '@/api/tasksApi';
import { isAxiosError } from 'axios';
import type { RouteParamValue } from 'vue-router';
import type { Category } from '@/modules/categories/interfaces/category.interface';
import type { ResponseError } from '@/modules/categories/interfaces/categories-list.response';

export const getCategoryAction = async (id: string | RouteParamValue[]): Promise<Category | ResponseError> => {
  try {
    const response = await todoApi.get(`/categories/${id}`);

    return {
      id: response.data.data[0].id,
      title: response.data.data[0].attributes.title,
      slug: response.data.data[0].attributes.slug,
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
