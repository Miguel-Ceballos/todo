<script setup lang="ts">
import Sidebar from '@/modules/common/layouts/Sidebar.vue';
</script>

<template>
  <div>
    <main class="flex flex-row min-h-full">
      <sidebar />

      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
