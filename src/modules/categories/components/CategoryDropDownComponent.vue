<script setup lang="ts">
import EllipsisVerticalIcon from '@/modules/common/icons/EllipsisVerticalIcon.vue';
import type { Category } from '@/modules/tasks/interfaces/task.interface';
import { useModalStore } from '@/modules/common/stores/modal.store';

const modalStore = useModalStore();

interface Props {
  category: Category;
}

defineProps<Props>();

</script>

<template>
  <div class="dropdown dropdown-hover">
    <div
      tabindex="0"
      class="p-1 bg-gray-800 rounded-full text-xs text-white group hover:bg-gray-700 hover:cursor-pointer"
    >
      <ellipsis-vertical-icon />
    </div>
    <ul tabindex="0" class="dropdown-content menu bg-gray-800 rounded-box z-[1] w-52 p-2 shadow">
      <li @click="modalStore.handleCategoryModal(category, true)" class="hover:bg-gray-700 rounded-lg"><a>Edit</a></li>
      <li class="hover:bg-gray-700 rounded-lg"><a>Delete</a></li>
    </ul>
  </div>
</template>
