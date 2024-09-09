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

const categories = useCategoriesStore();
const modalStore = useModalStore();
</script>

<template>
  <div class="fixed min-w-72">
    <div class="space-y-4 my-4">
      <h2 class="text-xl font-bold text-center text-purple-500">
        <router-link to="/">TODOApp</router-link>
      </h2>
    </div>
    <ul class="menu">
      <li class="hover:bg-zincs-800 hover:rounded-md group">
        <create-button text="New" />
      </li>
      <li class="hover:bg-zincs-800 hover:rounded-md">
        <router-link :to="{ name: 'home' }" class="text-gray-400 hover:text-gray-100">
          <list-bullet-icon />
          Tasks
        </router-link>
      </li>
      <li class="hover:bg-zincs-800 hover:rounded-md">
        <a class="text-gray-400 hover:text-gray-100">
          <calendar-icon />
          Today
        </a>
      </li>
      <li class="hover:bg-zincs-800 hover:rounded-md">
        <a class="text-gray-400 hover:text-gray-100">
          <calendar-days-icon />
          Upcoming
        </a>
      </li>
      <li class="hover:bg-zincs-800 hover:rounded-md">
        <router-link :to="{ name: 'completed-tasks' }" class="text-gray-400 hover:text-gray-100">
          <check-circle-icon />
          Completed
        </router-link>
      </li>
    </ul>
    <ul class="menu">
      <li class="menu-title"><a>Categories</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md group">
        <create-button @click="modalStore.handleCategoryModal(null, false)" text="New Category" />
      </li>
      <li v-for="category in categories.categories" class="hover:bg-zincs-800 hover:rounded-md">
        <router-link
          :to="{ name: 'category-tasks', params: { id: category.id } }"
          class="text-gray-400 hover:text-gray-100"
        >
          <hashtag-icon />
          {{ category.title }}
        </router-link>
      </li>
    </ul>
    <ul class="menu fixed bottom-0 min-w-72">
      <li class="hover:bg-zincs-800 hover:rounded-md">
        <router-link
          :to="{name: 'login'}"
          class="text-gray-400 hover:text-gray-100"
        >
          <user-icon />
          Log In
        </router-link>
      </li>
      <li class="hover:bg-zincs-800 hover:rounded-md">
        <router-link
          :to="{name: 'register'}"
          class="text-gray-400 hover:text-gray-100"
        >
          <user-plus-icon />
          Register
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
