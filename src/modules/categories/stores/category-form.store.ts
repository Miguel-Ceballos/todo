import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { Category } from '@/modules/tasks/interfaces/task.interface'

export const useCategoryFormStore = defineStore('category-form', () => {
  // @ts-ignore
  const form = reactive(<Category>{id: 0, title: ''});

  const clearForm = () => {
    form.id = 0;
    form.title = '';
  };

  return {
    form,
    clearForm,
  };
});