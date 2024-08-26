<script setup lang="ts">
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue';
import TaskForm from '@/modules/tasks/components/TaskForm.vue';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
const categoriesStore = useCategoriesStore();

const categoryTasks = ref([]);
const category = ref();

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
  <div class="bg-[#171C28] w-full min-h-full">
    <div class="max-w-4xl overflow-x-hidden px-10 lg:mx-auto my-6 sm:my-16">
      <div class="space-y-6">
        <div class="flex space-x-4 justify-between items-end">
          <h2 class="text-2xl text-gray-300 md:text-3xl font-bold">{{category}}</h2>
          <div class="flex gap-2">
            <check-circle-icon size="6" />
            <p class="text-md">{{ categoryTasks.length }} Tasks</p>
          </div>
        </div>
        <div>
          <task-form />
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
    </div>
  </div>
</template>

<style scoped></style>
