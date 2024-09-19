<script setup lang="ts">
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import CreateButton from '@/modules/common/components/CreateButton.vue'
import { useModalStore } from '@/modules/common/stores/modal.store'
import CategoryForm from '@/modules/categories/components/CategoryForm.vue'
import AlertComponent from '@/modules/categories/components/AlertComponent.vue'
import CategoryDropDownComponent from '@/modules/categories/components/CategoryDropDownComponent.vue';
import { useTasksStore } from '@/modules/tasks/store/tasks.store';

const route = useRoute();
const categoriesStore = useCategoriesStore();
const modalStore = useModalStore();
const tasksStore = useTasksStore();

//TODO: Buscar solución para solo ejecutar las peticiones una sola vez.

watch(() => route.params.id, async () => {
  await categoriesStore.getValues(route.params.id);
})

onMounted(async () => {
  categoriesStore.category = await categoriesStore.getCategory(route.params.id);
  categoriesStore.categoryTasks = await categoriesStore.getCategoryTasks(route.params.id);
});
</script>

<template>
  <alert-component />
  <category-form v-if="modalStore.isCategoryModal" />
  <div class="space-y-6">
    <div class="flex space-x-4 justify-between items-end px-4">
      <h2 class="text-2xl text-gray-300 md:text-3xl font-bold flex items-center gap-4">
        {{categoriesStore.category.title}}
        <category-drop-down-component  :category="categoriesStore.category"/>
      </h2>
      <div class="flex gap-2">
        <create-button @click="modalStore.handleTaskModal(null, false)" text="New Task" />
        <task-form v-if="modalStore.isTaskModal"/>
      </div>
    </div>
    <div>

    </div>
    <ul class="p-4 bg-[#121621] rounded-xl">
      <li
        v-if="categoriesStore.categoryTasks.length > 0"
        v-for="task in categoriesStore.categoryTasks"
        :key="task.id"
        class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 pt-2 pb-6 rounded-t-md group transition-duration-200 flex gap-4 justify-center"
      >
          <div class="mt-1">
            <input
              @click="tasksStore.isTaskDone(task)"
              type="checkbox"
              class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2 z-9999"
            />
          </div>
          <div @click="modalStore.handleTaskModal(task, true)" class="flex w-full space-x-2">
            <div class="w-full overflow-hidden">
              <div class="flex flex-col">
                <h3
                  class="text-gray-200 text-sm mb-1 group-hover:text-accent group-hover:font-semibold"
                >
                  {{ task.title }}
                </h3>
                <p class="truncate text-xs">{{ task.description }}</p>
              </div>
            </div>
          </div>
      </li>
      <li v-else class="text-center">There are no existing tasks.</li>
    </ul>
  </div>
</template>

<style scoped></style>
