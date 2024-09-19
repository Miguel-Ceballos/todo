<script setup lang="ts">
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import { useCompletedTasksStore } from '@/modules/tasks/store/completed-tasks.store';
import { onMounted } from 'vue';

const completedTasksStore = useCompletedTasksStore();

onMounted(async () => {
  completedTasksStore.completedTasks = await completedTasksStore.getCompletedTasks();
});

</script>

<template>
  <div class="space-y-6">
    <div class="flex space-x-4 justify-between items-end">
      <h2 class="text-2xl text-gray-300 md:text-3xl font-bold">Completed Tasks</h2>
    </div>
    <div>
      <task-form />
    </div>
    <ul class="p-4 bg-[#121621] rounded-xl">
      <li
        v-if="completedTasksStore.completedTasksLength > 0"
        v-for="task in completedTasksStore.completedTasks"
        :key="task.id"
        class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md group transition-duration-200 flex gap-4 justify-center"
      >
        <div class="mt-1">
          <input
            @click="completedTasksStore.uncheckTask(task)"
            :checked="task.status === 'C'"
            type="checkbox"
            class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2"
          />
        </div>
        <div class="flex w-full space-x-2">
          <div class="w-full overflow-hidden">
            <div class="flex flex-col">
              <h3
                class="text-gray-200 text-sm mb-1 group-hover:text-accent group-hover:font-semibold"
              >
                {{ task.title }}
              </h3>
              <p class="truncate text-xs">{{ task.description }}</p>
            </div>
            <div class="flex justify-end">
              <button class="btn btn-ghost btn-xs justify-end">#{{ task.category.title }}</button>
            </div>
          </div>
        </div>
      </li>
      <li v-else class="text-center">There are no existing tasks.</li>
    </ul>
  </div>
</template>

<style scoped></style>
