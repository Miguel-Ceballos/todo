import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import type { Task } from '@/modules/tasks/interfaces/task.interface';
import { todoApi } from '@/modules/tasks/api/tasksApi';
import type { TasksListResponse } from '@/modules/tasks/interfaces/tasks-list.response';


export const useCompletedTasksStore = defineStore('completedTasks', () => {
  const completedTasks = ref<Task[]>([]);

  const getCompletedTasks = async () => {
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

  const uncheckTask = async (task: Task) => {
    try {
      const response = await todoApi.patch(`/tasks/${task.id}`, {
        data: {
          type: 'tasks',
          attributes: {
            status: 'P',
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
        completedTasks.value = await getCompletedTasks();
      }
    } catch (e) {
      throw 'Unexpected error.';
    }
  };

    // if (response.status === 200) {
    //   tasks.value = await getTasks();
    //   alertStore.handleClickAlert('Category Completed successfully');
    // } else {
    //   return;
    // }


  onMounted(async () => {
    completedTasks.value = await getCompletedTasks();
  });

  return {
    completedTasks,
    getCompletedTasks,
    uncheckTask,
    completedTasksLength: computed(() => completedTasks.value.length),
  };
});