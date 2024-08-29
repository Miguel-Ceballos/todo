import { defineStore } from 'pinia';
import { todoApi } from '@/modules/tasks/api/tasksApi';
import { onMounted, ref } from 'vue';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { Task } from '@/modules/tasks/interfaces/task.interface';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([]);

  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await todoApi.get<TasksListResponse>('/tasks?status=P&include=category');

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

  const getPendingTasks = async (): Promise<Task[]> => {
    try {
      const response = await todoApi.get<TasksListResponse>('/tasks?status=C&include=category');

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

  const postTasks = async (form: Task) => {
    const response = await todoApi.post(`/tasks/`, {
      data: {
        type: 'tasks',
        attributes: {
          title: form.title,
          description: form.description,
          status: form.status,
        },
        relationships: {
          category: {
            data: {
              type: 'categories',
              id: form.category,
            },
          }
        }
      },
    });

    console.log(response);
  }

  onMounted(async () => {
    tasks.value = await getTasks();
  });

  return {
    getTasks,
    getPendingTasks,
    postTasks,
    tasks,
  };
});
