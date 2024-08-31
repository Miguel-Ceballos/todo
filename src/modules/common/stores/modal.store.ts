import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Task } from '@/modules/tasks/interfaces/task.interface';
import { useTaskFormStore } from '@/modules/tasks/store/task-form.store';

export const useModalStore = defineStore('modal', () => {
  const taskFormStore = useTaskFormStore();
  const oModal = ref(false);

  const handleClickModal = (form?: Task) => {
    if (form) Object.assign(taskFormStore.form, form);

    oModal.value = !oModal.value;
    if (!oModal.value) {
      taskFormStore.clearForm();
    }
  };

  return {
    oModal,
    handleClickModal,
  };
});
