import type { Category } from '@/modules/categories/interfaces/category.interface';
import type { DeletedResponse, ResponseError } from '@/modules/categories/interfaces/categories-list.response';
import { todoApi } from '@/api/tasksApi';
import { isAxiosError } from 'axios';


export const deleteCategoryAction = async (id: Category['id']): Promise<DeletedResponse | ResponseError> => {
  try {
    return await todoApi.delete(`/categories/${id}`);
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