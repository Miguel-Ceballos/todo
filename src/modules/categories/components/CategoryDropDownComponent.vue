<script setup>
import EllipsisVerticalIcon from '@/modules/common/icons/EllipsisVerticalIcon.vue';
import { ref } from 'vue';

const openDropdown = ref(false);

const toggleDropdown = () => {
  openDropdown.value = !openDropdown.value;
};
</script>

<template>
  <div class="dropdown">
    <div
      @click="toggleDropdown"
      tabindex="0"
      class="p-1 bg-gray-800 rounded-full text-xs text-white hover:bg-gray-700 hover:cursor-pointer"
    >
      <ellipsis-vertical-icon />
    </div>
    <ul
      @close="toggleDropdown"
      v-if="openDropdown"
      class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
    >
      <li><a>Edit</a></li>
      <li><a>Delete</a></li>
    </ul>
  </div>
</template>
