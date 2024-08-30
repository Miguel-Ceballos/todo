import { defineStore } from 'pinia';
import { todoApi } from '@/modules/tasks/api/tasksApi';
import { onMounted, ref, type UnwrapNestedRefs } from 'vue';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { Form, Task } from '@/modules/tasks/interfaces/task.interface';

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
          category: task.includes.attributes.title,
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
          category: task.includes.attributes.title,
        };
      });
    } catch (e) {
      throw 'Unexpected error.';
    }
  };

  const postTasks = async (form: Form) => {
    const response = await todoApi.post('/tasks', {
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
          },
        },
      },
    });

    if (response.data.errors) {
      const errors: string[] = [];
      response.data.errors.forEach((error: { message: string }) => {
        errors.push(error.message);
      });
      return errors;
    }

    tasks.value = await getTasks();

    return response.status;
  };

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
