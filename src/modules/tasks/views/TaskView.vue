<script setup lang="ts">
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import { useTasksStore } from '@/modules/tasks/store/tasks.store';
import CreateButton from '@/modules/common/components/CreateButton.vue'
import { useModalStore } from '@/modules/common/stores/modal.store'
import AlertComponent from '@/modules/categories/components/AlertComponent.vue'
import CategoryForm from '@/modules/categories/components/CategoryForm.vue'

const tasksStore = useTasksStore();
const modalStore = useModalStore();

</script>

<template>
  <alert-component />
  <category-form v-if="modalStore.isCategoryModal" />
  <div class="space-y-6">
    <div class="flex space-x-4 justify-between items-end px-4">
      <h2 class="text-2xl text-gray-300 md:text-3xl font-extrabold">Tasks <span class="font-normal text-lg text-gray-500"> · ({{tasksStore.tasks.length}})</span></h2>
      <div class="flex gap-2">
        <create-button @click="modalStore.handleTaskModal(null, false)" text="New Task" />
        <task-form v-if="modalStore.isTaskModal"/>
      </div>
    </div>
    <div>
    </div>
    <ul v-if="tasksStore.tasks" class="p-4 bg-[#121621] rounded-xl">
      <li
        v-for="task in tasksStore.tasks"
        :key="task.id"
        @click="modalStore.handleTaskModal(task, true)"
        class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md group transition-duration-200"
      >
        <div class="flex w-full space-x-2">
          <div class="mt-1">
            <input
              type="checkbox"
              class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2"
            />
          </div>
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
    </ul>
    <ul v-else>
      <li>
        <p>No hay tareas existentes.</p>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
