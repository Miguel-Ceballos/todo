import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { todoApi } from '@/modules/tasks/api/tasksApi';
import type { Category } from '@/modules/categories/interfaces/category.interface';
import type { CategoriesListResponse } from '@/modules/categories/interfaces/categories-list.response';
import type { CategoryTask } from '@/modules/tasks/interfaces/task.interface';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { RouteParamValue } from 'vue-router';
import { useModalStore } from '@/modules/common/stores/modal.store';
import { useAlertStore } from '@/modules/common/stores/alert.store';

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([]);
  const modalStore = useModalStore();
  const alertStore = useAlertStore();

  const categoryTasks = ref([]);
  const category = ref(<Category>{});

  const getCategories = async (): Promise<Category[]> => {
    const response = await todoApi.get<CategoriesListResponse>('/categories/');

    return response.data.data.map((category) => {
      return {
        id: category.id,
        title: category.attributes.title,
        slug: category.attributes.slug,
      };
    });
  };

  const getCategory = async (id: string | RouteParamValue[]) => {
    const response = await todoApi.get(`/categories/${id}`);
    return {
      id: response.data.data.id,
      title: response.data.data.attributes.title,
      slug: response.data.data.attributes.slug,
    };
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

    if (response.data.errors) {
      const errors: string[] = [];
      response.data.errors.forEach((error: { message: string }) => {
        errors.push(error.message);
      });
      return errors;
    }

    if (response.status === 201) {
      categories.value = await getCategories();
      modalStore.handleCategoryModal();
    }
    alertStore.handleClickAlert('Category created successfully');
  };

  const updateCategory = async (form: Category) => {
    const response = await todoApi.patch(`/categories/${form.id}`, {
      data: {
        type: 'categories',
        attributes: {
          title: form.title,
        },
      },
    });

    if (response.data.errors) {
      const errors: string[] = [];
      response.data.errors.forEach((error: { message: string }) => {
        errors.push(error.message);
      });
      return errors;
    }

    if (response.status === 200) {
      categories.value = await getCategories();
      category.value = await getCategory(response.data.data.id);
      modalStore.handleCategoryModal();
    }
    alertStore.handleClickAlert('Category updated successfully');
  };

  async function getValues(id: string | RouteParamValue[]){
    category.value = await getCategory(id);
    // @ts-ignore
    categoryTasks.value = await getCategoryTasks(id);
  }

  onMounted(async () => {
    categories.value = await getCategories();
  });

  return {
    category,
    categories,
    categoryTasks,
    getValues,
    getCategory,
    postCategory,
    getCategoryTasks,
    updateCategory,
  };
});
