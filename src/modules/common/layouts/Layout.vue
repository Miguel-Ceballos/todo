<script setup lang="ts">
import Sidebar from '@/modules/common/layouts/Sidebar.vue';
import { ref } from 'vue';
import BarsIcon from '@/modules/common/icons/BarsIcon.vue';

const showSidebar = ref(false);

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value;
}
</script>

<template>
  <div>
    <main class="flex flex-row min-h-screen h-full">
      <aside
        class="bg-[#121621] min-w-60 md:min-w-72 min-h-full fixed lg:relative lg:inline z-10"
        :class="showSidebar ? 'block' : 'hidden transition-all duration-1000 ease-in-out'"
      >
        <div class="flex justify-between m-5 ">
          <h2 class="text-xl font-bold text-center text-purple-500">
            <router-link to="/">TODOApp</router-link>
          </h2>
          <BarsIcon @click="toggleSidebar" class="lg:hidden"/>
        </div>
        <sidebar />
      </aside>

      <div class="bg-[#171C28] w-full min-h-screen h-full">
        <div class="md:max-w-4xl lg:max-w-4xl overflow-x-hidden p-2 md:px-10 lg:mx-auto my-3 md:my-10 lg:my-16 mx-auto">
          <BarsIcon @click="toggleSidebar" class="mb-1 lg:hidden"/>
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
