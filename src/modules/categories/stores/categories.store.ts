import { defineStore } from 'pinia';
import { onMounted, ref } from 'vue';
import { todoApi } from '@/api/tasksApi';
import type { Category } from '@/modules/categories/interfaces/category.interface';
import { type RouteParamValue, useRouter } from 'vue-router';
import { useModalStore } from '@/modules/common/stores/modal.store';
import { useAlertStore } from '@/modules/common/stores/alert.store';
import { useValidationErrorsStore } from '@/modules/common/stores/validation-errors.store';
import { getCategoriesAction } from '@/modules/categories/actions/get-categoires.action';
import { getCategoryAction } from '@/modules/categories/actions/get-category.action';
import { postCategoryAction } from '@/modules/categories/actions/post-category.action';
import { updateCategoryAction } from '@/modules/categories/actions/update-category.action';
import { deleteCategoryAction } from '@/modules/categories/actions/delete-category.action';

export const useCategoriesStore = defineStore('categories', () => {
  const modalStore = useModalStore();
  const alertStore = useAlertStore();
  const errorsStore = useValidationErrorsStore();

  const router = useRouter();

  const categories = ref<Category[]>([]);
  const category = ref<Category>({ slug: '', title: '', id: 0 });

  const getCategories = async () => {
    try {
      return await getCategoriesAction();
    } catch (e) {
      console.log(e);
    }
  };

  const getCategory = async (id: string | RouteParamValue[]) => {
    try {
      return await getCategoryAction(id);
    } catch (e) {
      console.log(e);
    }
  };

  const postCategory = async (form: Category) => {
    try {
      const response = await postCategoryAction(form);
      if (response.data.errors) {
        errorsStore.getErrors(response);
        return;
      }
      categories.value = await getCategories();
      modalStore.handleCategoryModal();
      alertStore.handleClickAlert('Category created successfully');
    } catch (e) {
      console.log(e);
    }
  };

  const updateCategory = async (form: Category) => {
    try {
      const response = await updateCategoryAction(form);
      if (response.data.errors) {
        errorsStore.getErrors(response);
        return;
      }
      categories.value = await getCategories();
      category.value = await getCategory(response.data.data.id);
      modalStore.handleCategoryModal();
      alertStore.handleClickAlert('Category updated successfully');
    } catch (e) {
      console.log(e);
    }
  };

  const deleteCategory = async (id: Category['id']) => {
    try {
      const response = await deleteCategoryAction(id);
      if (response.data.status === 200){
        await router.push({ name: 'home' });
        categories.value = await getCategories();
        alertStore.handleClickAlert('Category deleted successfully');
      }
      return response;
    } catch (e) {
      console.log(e);
    }
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
