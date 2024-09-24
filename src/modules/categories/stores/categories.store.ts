import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { todoApi } from '@/api/tasksApi';
import type { Category } from '@/modules/categories/interfaces/category.interface';
import type { CategoriesListResponse } from '@/modules/categories/interfaces/categories-list.response';
import { type RouteParamValue, useRouter } from 'vue-router';
import { useModalStore } from '@/modules/common/stores/modal.store';
import { useAlertStore } from '@/modules/common/stores/alert.store';
import { useValidationErrorsStore } from '@/modules/common/stores/validation-errors.store';

export const useCategoriesStore = defineStore('categories', () => {

  const modalStore = useModalStore();
  const alertStore = useAlertStore();
  const errorsStore = useValidationErrorsStore();

  const router = useRouter();

  const categories = ref<Category[]>([]);

  const category = ref<Category>({ slug: '', title: '', id: 0 });

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
      id: response.data.data[0].id,
      title: response.data.data[0].attributes.title,
      slug: response.data.data[0].attributes.slug,
    };
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
      errorsStore.getErrors(response);
      return;
    }

    if (response.status === 201) {
      categories.value = await getCategories();
      modalStore.handleCategoryModal();
      alertStore.handleClickAlert('Category created successfully');
    }
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
      errorsStore.getErrors(response);
      return;
    }

    if (response.status === 200) {
      categories.value = await getCategories();
      category.value = await getCategory(response.data.data.id);
      modalStore.handleCategoryModal();
      alertStore.handleClickAlert('Category updated successfully');
    }
  };

  const deleteCategory = async (id: Category['id']) => {
    const response = await todoApi.delete(`/categories/${id}`);
    if (response.data.errors) {
      const errors: string[] = [];
      response.data.errors.forEach((error: { message: string }) => {
        errors.push(error.message);
      });
      return errors;
    }
    await router.push({ name: 'home' });
    categories.value = await getCategories();
    alertStore.handleClickAlert('Category deleted successfully');
  };

  onMounted(async () => {
    categories.value = await getCategories();
  });

  return {
    category,
    categories,
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory,
  };
});
