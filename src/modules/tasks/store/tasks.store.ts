import { defineStore } from 'pinia';
import { todoApi } from '@/api/tasksApi';
import { onMounted, ref } from 'vue';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';
import type { Task } from '@/modules/tasks/interfaces/task.interface';
import { useModalStore } from '@/modules/common/stores/modal.store';
import { useAlertStore } from '@/modules/common/stores/alert.store'
import { useValidationErrorsStore } from '@/modules/common/stores/validation-errors.store';
import type { RouteParamValue } from 'vue-router';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';

export const useTasksStore = defineStore('tasks', () => {
  const modalStore = useModalStore();
  const alertStore = useAlertStore();
  const errorsStore = useValidationErrorsStore();
  const categoryStore = useCategoriesStore();

  const tasks = ref<Task[]>([]);
  const categoryTasks = ref<Task[]>([]);
  const currentCategory = ref<string>('');

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

  const getCategoryTasks = async (id: string | RouteParamValue[]): Promise<Task[]> => {
    const response = await todoApi.get<TasksListResponse>(`/categories/${id}?include=tasks`);

    categoryStore.category = {
      id: response.data.data[0].id,
      title: response.data.data[0].attributes.title,
      slug: response.data.data[0].attributes.slug,
    };

    return response.data.data[0].includes.map((task) => {
      return {
        id: task.id,
        title: task.attributes.title,
        description: task.attributes.description,
        status: task.attributes.status,
        category: { id: task.relationships.category.data.id },
      };
    });
    // return response.data.data.map((task) => {
    //   return {
    //     id: task.id,
    //     title: task.attributes.title,
    //     description: task.attributes.description,
    //     status: task.attributes.status,
    //     category: { id: task.relationships.category.data.id },
    //   };
    // });
  };

  const postTasks = async (form: Task, isTaskByCategory: boolean = false) => {
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

    if (response.data.errors) {
      errorsStore.getErrors(response);
      return;
    }

    if (response.status === 201) {
      if (isTaskByCategory) {
        categoryTasks.value = await getCategoryTasks(currentCategory.value);
      } else {
        tasks.value = await getTasks();
      }
      modalStore.handleTaskModal();
      alertStore.handleClickAlert('Task created successfully!');
    }
  };

  const updateTask = async (form: Task, isTaskByCategory: boolean = false) => {
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

    console.log(response);
    if (response.data.errors) {
      errorsStore.getErrors(response);
      return;
    }

    if (response.status === 200) {
      if (isTaskByCategory) {
        categoryTasks.value = await getCategoryTasks(currentCategory.value);
      } else {
        tasks.value = await getTasks();
      }
      modalStore.handleTaskModal();
    }

    alertStore.handleClickAlert('Task updated successfully!');
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
      modalStore.handleTaskModal();
    }

    alertStore.handleClickAlert('Task deleted successfully!');
  };

  const isTaskDone = async (task: Task, isTaskByCategory: boolean = false) => {
    console.log(task);
    const response = await todoApi.patch(`/tasks/${task.id}`, {
      data: {
        type: 'tasks',
        attributes: {
          status: 'C',
        },
        relationships: {
          category: {
            data: {
              type: 'categories',
              id: task.category.id,
            },
          },
        },
      },
    });

    if (response.status === 200) {
      if (isTaskByCategory) {
        categoryTasks.value = await getCategoryTasks(currentCategory.value);
      } else {
        tasks.value = await getTasks();
      }
      categoryTasks.value = await getCategoryTasks(currentCategory.value);
      alertStore.handleClickAlert('Category Completed successfully');
    } else {
      return;
    }
  };

  onMounted(async () => {
    tasks.value = await getTasks();
  });

  return {
    getTasks,
    postTasks,
    updateTask,
    deleteTask,
    isTaskDone,
    getCategoryTasks,
    tasks,
    categoryTasks,
    currentCategory,
  };
});
