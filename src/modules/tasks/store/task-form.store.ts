import { reactive } from 'vue'
import type { Status } from '@/modules/tasks/interfaces/tasks-list.response'
import type { Category, Task } from '@/modules/tasks/interfaces/task.interface'
import { defineStore } from 'pinia'

export const useTaskFormStore = defineStore('task-form', () => {
  // @ts-ignore
  const form = reactive(<Task>{id: 0, title: '', description: '', status: <Status>'P', due_date: '', category: <Category>{ id: 0, title: '' }});

  const clearForm = () => {
    form.id = 0;
    form.title = '';
    form.description = '';
    form.status = <Status>'P';
    form.due_date = '';
    form.category = <Category>{ id: 0, title: '' };
  };

  return {
    form,
    clearForm,
  };
});