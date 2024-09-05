import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/modules/tasks/interfaces/task.interface';
import { useTaskFormStore } from '@/modules/tasks/store/task-form.store';
import { useCategoryFormStore } from '@/modules/categories/stores/category-form.store'


export const useModalStore = defineStore('modal', () => {
  const taskFormStore = useTaskFormStore();
  const categoryFormStore = useCategoryFormStore()
  const isTaskModal = ref(false);
  const isCategoryModal = ref(false);
  const isUpdate = ref(false);

  const handleTaskModal = (form?: Task | null, isUpd: boolean = false) => {
    if (form) {
      isUpdate.value = isUpd;
      Object.assign(taskFormStore.form, form);
    }

    isTaskModal.value = !isTaskModal.value;

    if (!isTaskModal.value) {
      taskFormStore.clearForm();
      isUpdate.value = isUpd;
    }
  };

  const handleCategoryModal = (form?: Task | null, isUpd: boolean = false) => {
    if (form) {
      isUpdate.value = isUpd;
      Object.assign(categoryFormStore.form, form);
    }

    isCategoryModal.value = !isCategoryModal.value;

    if (!isCategoryModal.value) {
      categoryFormStore.clearForm();
      isUpdate.value = isUpd;
    }
  };

  return {
    isTaskModal,
    isCategoryModal,
    isUpdate,
    handleTaskModal,
    handleCategoryModal,
  };
});
