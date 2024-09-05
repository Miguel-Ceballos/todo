import { type _ExtractStateFromSetupStore, defineStore } from 'pinia'
import { onMounted, ref, type UnwrapNestedRefs, type UnwrapRef } from 'vue'
import { todoApi } from '@/modules/tasks/api/tasksApi';
import type { Category } from '@/modules/categories/interfaces/category.interface';
import type { CategoriesListResponse } from '@/modules/categories/interfaces/categories-list.response';
import type { CategoryTask, Task } from '@/modules/tasks/interfaces/task.interface'
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { RouteParamValue } from 'vue-router';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  const getCategories = async (): Promise<Category[]> => {
    const response = await todoApi.get<CategoriesListResponse>('/categories/');

    return response.data.data.map((category) => {
      return {
        id: category.id,
        title: category.attributes.title,
      };
    });
  };

  const getCategory = async (id: string | RouteParamValue[]) => {
    const response = await todoApi.get(`/categories/${id}`);
    return response.data.data.attributes.title;
  };

  const getCategoryTasks = async (id: string | RouteParamValue[]): Promise<CategoryTask[]> => {
    const response = await todoApi.get<TasksListResponse>(`/categories/${id}/tasks?status=P,D`);

    return response.data.data.map((task) => {
      return {
        id: task.id,
        title: task.attributes.title,
        description: task.attributes.description,
        status: task.attributes.status,
      };
    });
  };

  const postCategory = async (form: Category) => {
    const response = await todoApi.post(`/categories/`, {
      data: {
        type: 'categories',
        attributes: {
          title: form.title,
        },
      },
    });

    console.log(response);
  };

  onMounted(async () => {
    categories.value = await getCategories();
  });

  return {
    categories,
    getCategory,
    postCategory,
    getCategoryTasks,
  };
});
