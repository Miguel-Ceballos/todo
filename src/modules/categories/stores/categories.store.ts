import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { todoApi } from '@/modules/tasks/api/tasksApi';
import type { Category } from '@/modules/categories/interfaces/category.interface';
import type { CategoriesListResponse } from '@/modules/categories/interfaces/categories-list.response';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);

  const getCategories = async (): Promise<Category[]> => {
    const response = await todoApi.get<CategoriesListResponse>('/categories');

    console.log(response)

    return response.data.data.map((category) => {
      return {
        title: category.attributes.title,
      };
    });
  };

  onMounted(async () => {
    categories.value = await getCategories();
  });

  return {
    categories,
  };
});
