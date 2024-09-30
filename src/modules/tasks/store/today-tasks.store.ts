import { defineStore } from 'pinia';
import { todoApi } from '@/api/tasksApi';
import { onMounted, ref } from 'vue';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { Task } from '@/modules/tasks/interfaces/task.interface';

export const useTodayTasksStore = defineStore('today-tasks', () => {
  const todayTasks = ref<Task[]>([]);
  const today = ref('');

  const getTodayTasks = async (today: string): Promise<Task[]> => {
    try {
      const response = await todoApi.get<TasksListResponse>(`/tasks?status=P,D&due_date=${today}&include=category`);

      return response.data.data.map((task) => {
        return {
          id: task.id,
          title: task.attributes.title,
          description: task.attributes.description,
          status: task.attributes.status,
          due_date: task.attributes.due_date,
          category: { id: task.includes.id, title: task.includes.attributes.title },
        };
      });
    } catch (e) {
      throw 'Unexpected error.';
    }
  };

  return {
    getTodayTasks,
    todayTasks
  };
});
