<script setup lang="ts">
import EllipsisVerticalIcon from '@/modules/common/icons/EllipsisVerticalIcon.vue';
import type { Category } from '@/modules/tasks/interfaces/task.interface';
import { useModalStore } from '@/modules/common/stores/modal.store';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';

const modalStore = useModalStore();
const categoriesStore = useCategoriesStore();

interface Props {
  category: Category;
}

defineProps<Props>();

</script>

<template>
  <div class="z-1 dropdown dropdown-hover">
    <div
      tabindex="0"
      class="p-1 bg-gray-800 rounded-full text-xs text-white group hover:bg-gray-700 hover:cursor-pointer"
    >
      <ellipsis-vertical-icon />
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-gray-800 rounded-box w-52 p-2 shadow">
      <li @click="modalStore.handleCategoryModal(category, true)" class="hover:bg-gray-700 rounded-lg"><a>Edit</a></li>
      <li @click="categoriesStore.deleteCategory(category.id)" class="hover:bg-gray-700 rounded-lg"><a>Delete</a></li>
    </ul>
  </div>
</template>
