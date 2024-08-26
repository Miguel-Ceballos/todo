import { defineStore } from 'pinia';
import { todoApi } from '@/modules/tasks/api/tasksApi';
import { onMounted, ref } from 'vue';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { Task } from '@/modules/tasks/interfaces/task.interface';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);

  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await todoApi.get<TasksListResponse>('/tasks?include=category');

      return response.data.data.map((task) => {
        return {
          id: task.id,
          title: task.attributes.title,
          description: task.attributes.description,
          status: task.attributes.status,
          category: task.includes.attributes.title
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
