<script setup lang="ts">
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import CreateButton from '@/modules/common/components/CreateButton.vue'
import { useModalStore } from '@/modules/common/stores/modal.store'
import CategoryForm from '@/modules/categories/components/CategoryForm.vue'

const route = useRoute();
const categoriesStore = useCategoriesStore();
const modalStore = useModalStore();

const categoryTasks = ref([]);
const category = ref();

//TODO: Buscar solución para solo ejecutar las peticiones una sola vez.

watch(() => route.params.id, async () => {
  category.value = await categoriesStore.getCategory(route.params.id);
  categoryTasks.value = await categoriesStore.getCategoryTasks(route.params.id);
})

onMounted(async () => {
  category.value = await categoriesStore.getCategory(route.params.id);
  categoryTasks.value = await categoriesStore.getCategoryTasks(route.params.id);
});
</script>

<template>
  <category-form v-if="modalStore.isCategoryModal" />
  <div class="space-y-6">
    <div class="flex space-x-4 justify-between items-end">
      <h2 class="text-2xl text-gray-300 md:text-3xl font-bold">{{category}}</h2>
      <div class="flex gap-2">
        <check-circle-icon size="6" />
        <p class="text-md">{{ categoryTasks.length }} Tasks</p>
      </div>
    </div>
    <div>
      <create-button @click="modalStore.handleTaskModal(null, false)" text="New Task" />
      <task-form v-if="modalStore.isTaskModal"/>
    </div>
    <ul>
      <li
        v-for="task in categoryTasks"
        :key="task.id"
        class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-4 rounded-t-md group transition-duration-200"
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
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
