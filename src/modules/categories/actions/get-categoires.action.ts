import { todoApi } from '@/api/tasksApi';
import type {
  CategoriesListResponse,
  Data, Datum,
  ResponseError,
} from '@/modules/categories/interfaces/categories-list.response';
import { isAxiosError } from 'axios';
import type { Category } from '@/modules/categories/interfaces/category.interface';

export const getCategoriesAction = async () => {
  try {
    const response = await todoApi.get<CategoriesListResponse | ResponseError>('/categories');
    return response.data.data.map((category: Datum) => {
      return {
        id: category.id,
        title: category.attributes.title,
        slug: category.attributes.slug,
      };
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
