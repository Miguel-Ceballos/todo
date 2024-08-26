import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { todoApi } from '@/modules/tasks/api/tasksApi';
import type { Category } from '@/modules/categories/interfaces/category.interface';
import type { CategoriesListResponse } from '@/modules/categories/interfaces/categories-list.response';
import type { Task } from '@/modules/tasks/interfaces/task.interface';
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

  const getCategoryTasks = async (id: string | RouteParamValue[]): Promise<Task[]> => {
    const response = await todoApi.get<TasksListResponse>(`/categories/${id}/tasks`);

    return response.data.data.map((task) => {
      return {
        id: task.id,
        title: task.attributes.title,
        description: task.attributes.description,
        status: task.attributes.status,
      };
    });
  };

  onMounted(async () => {
    categories.value = await getCategories();
  });

  return {
    categories,
    getCategory,
    getCategoryTasks,
  };
});
