<script setup lang="ts">
import CreateButton from '@/modules/common/components/CreateButton.vue';
import ListBulletIcon from '@/modules/common/icons/ListBulletIcon.vue';
import CalendarIcon from '@/modules/common/icons/CalendarIcon.vue';
import CalendarDaysIcon from '@/modules/common/icons/CalendarDaysIcon.vue';
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue';
import HashtagIcon from '@/modules/common/icons/HashtagIcon.vue';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';
import { useModalStore } from '@/modules/common/stores/modal.store';
import UserIcon from '@/modules/common/icons/UserIcon.vue';
import UserPlusIcon from '@/modules/common/icons/UserPlusIcon.vue';
import LogOutIcon from '@/modules/common/icons/LogOutIcon.vue';
import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { useRoute } from 'vue-router';
import { watch } from 'vue';

const categories = useCategoriesStore();
const modalStore = useModalStore();
const authStore = useAuthStore();

const route = useRoute();

watch(() => route.path, () => {
  console.log(route.path)
})
</script>

<template>
  <div>
    <ul class="menu">
      <li class="hover:bg-[#212531] hover:rounded-md group">
        <create-button text="New" />
      </li>
      <li class="hover:bg-[#212531] hover:rounded-md">
        <router-link
          :to="{ name: 'home' }"
          :class="route.path === '/tasks/all' ? 'bg-[#212531] ' : ''"
          class="text-gray-400 hover:text-gray-100"
        >
          <list-bullet-icon />
          Tasks
        </router-link>
      </li>
      <li class="hover:bg-[#212531] hover:rounded-md">
        <router-link
          :to="{ name: 'today-tasks' }"
          :class="route.path === '/tasks/today' ? 'bg-[#212531] ' : ''"
          class="text-gray-400 hover:text-gray-100"
        >
          <calendar-icon />
          Today
        </router-link>
      </li>
      <li class="hover:bg-[#212531] hover:rounded-md">
        <a class="text-gray-400 hover:text-gray-100">
          <calendar-days-icon />
          Upcoming
        </a>
      </li>
      <li class="hover:bg-[#212531] hover:rounded-md">
        <router-link
          :to="{ name: 'completed-tasks' }"
          :class="route.path === '/tasks/completed' ? 'bg-[#212531] ' : ''"
          class="text-gray-400 hover:text-gray-100"
        >
          <check-circle-icon />
          Completed
        </router-link>
      </li>
    </ul>
    <ul class="menu">
      <li class="menu-title"><a>Categories</a></li>
      <li class="hover:bg-[#212531] hover:rounded-md group">
        <create-button @click="modalStore.handleCategoryModal(null, false)" text="New Category" />
      </li>
      <li
        v-if="categories.categories.length > 0"
        v-for="category in categories.categories"
        class="hover:bg-[#212531] hover:rounded-md"
      >
        <router-link
          :to="{ name: 'category-tasks', params: { id: category.id } }"
          class="text-gray-400 hover:text-gray-100"
          :class="route.path === `/tasks/${category.id}` ? 'bg-[#212531] ' : ''"
        >
          <hashtag-icon />
          {{ category.title }}
        </router-link>
      </li>
      <li v-else class="text-center">There are no existing categories</li>
    </ul>
    <ul class="menu fixed bottom-0 min-w-72">
      <li @click="authStore.logout()" class="hover:bg-[#212531] hover:rounded-md">
        <button class="text-gray-400 hover:text-gray-100">
          <log-out-icon />
          Log Out
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
