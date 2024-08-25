import { defineStore } from 'pinia';
import { tasksApi } from '@/modules/tasks/api/tasksApi';
import { onMounted, ref } from 'vue';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { Task } from '@/modules/tasks/interfaces/task.interface';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);

  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await tasksApi.get<TasksListResponse>('/tasks');

      return response.data.data.map((task) => {
        return {
          id: task.id,
          title: task.attributes.title,
          description: task.attributes.description,
          status: task.attributes.status,
        };
      });
    } catch (e) {
      throw 'Unexpected error.';
    }
  };

  onMounted(async () => {
    tasks.value = await getTasks();
  });

  return {
    getTasks,
    tasks,
  };
});
