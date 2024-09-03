import { defineStore } from 'pinia';
import { todoApi } from '@/modules/tasks/api/tasksApi';
import { onMounted, ref } from 'vue';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { Task } from '@/modules/tasks/interfaces/task.interface';
import { useModalStore } from '@/modules/common/stores/modal.store';

export const useTasksStore = defineStore('tasks', () => {
  const modalStore = useModalStore();
  const tasks = ref<Task[]>([]);

  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await todoApi.get<TasksListResponse>('/tasks?status=P,D&include=category');

      return response.data.data.map((task) => {
        return {
          id: task.id,
          title: task.attributes.title,
          description: task.attributes.description,
          status: task.attributes.status,
          category: { id: task.includes.id, title: task.includes.attributes.title },
        };
      });
    } catch (e) {
      throw 'Unexpected error.';
    }
  };

  const getCompletedTasks = async (): Promise<Task[]> => {
    try {
      const response = await todoApi.get<TasksListResponse>('/tasks?status=C&include=category');

      return response.data.data.map((task) => {
        return {
          id: task.id,
          title: task.attributes.title,
          description: task.attributes.description,
          status: task.attributes.status,
          category: { id: task.includes.id, title: task.includes.attributes.title },
        };
      });
    } catch (e) {
      throw 'Unexpected error.';
    }
  };

  const postTasks = async (form: Task) => {
    console.log('hello world');
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
              id: form.category.id,
            },
          },
        },
      },
    });

    console.log(response);

    if (response.data.errors) {
      const errors: string[] = [];
      response.data.errors.forEach((error: { message: string }) => {
        errors.push(error.message);
      });
      return errors;
    }

    if (response.status === 201) {
      tasks.value = await getTasks();
      modalStore.handleClickModal();
    }

    return response.status;
  };

  const updateTask = async (form: Task) => {
    const response = await todoApi.patch(`/tasks/${form.id}`, {
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
              id: form.category.id,
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

    if (response.status === 200) {
      tasks.value = await getTasks();
      modalStore.handleClickModal();
    }

    return response.status;
  };

  const deleteTask = async (id: Task['id']) => {
    if (confirm('Are you sure you want to delete this task?')) {
      const response = await todoApi.delete(`/tasks/${id}`);
      if (response.data.errors) {
        const errors: string[] = [];
        response.data.errors.forEach((error: { message: string }) => {
          errors.push(error.message);
        });
        return errors;
      }
      tasks.value = await getTasks();
      modalStore.handleClickModal();
    }
  };

  onMounted(async () => {
    tasks.value = await getTasks();
  });

  return {
    getTasks,
    getCompletedTasks,
    postTasks,
    updateTask,
    deleteTask,
    tasks,
  };
});
