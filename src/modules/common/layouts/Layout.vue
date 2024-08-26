<script setup lang="ts">
import Sidebar from '@/modules/common/layouts/Sidebar.vue';
</script>

<template>
  <div>
    <main class="flex flex-row min-h-screen h-full">
      <aside class="bg-[#121621] min-w-72 min-h-full hidden lg:inline">
        <sidebar />
      </aside>

      <div class="bg-[#171C28] w-full min-h-screen h-full">
        <div class="max-w-4xl overflow-x-hidden px-10 lg:mx-auto my-6 sm:my-16">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
