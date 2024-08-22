<script setup lang="ts">

import CreateButton from '@/modules/common/components/CreateButton.vue'
import ListBulletIcon from '@/modules/common/icons/ListBulletIcon.vue'
import CalendarIcon from '@/modules/common/icons/CalendarIcon.vue'
import CalendarDaysIcon from '@/modules/common/icons/CalendarDaysIcon.vue'
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue'
import GoalsIcon from '@/modules/common/icons/GoalsIcon.vue'
import CalendarEvents from '@/modules/common/icons/CalendarEvents.vue'
</script>

<template>
  <aside class="bg-[#121621] min-w-72 h-[100vh] hidden lg:inline">
    <div class="space-y-4 my-4">
      <h2 class="text-xl font-bold text-center">
        <router-link to="/">TODOApp</router-link>
      </h2>
    </div>
    <ul class="menu">
      <li class="hover:bg-gray-700 hover:rounded-md"><create-button text="New Category" /></li>
      <li class="hover:bg-gray-700 hover:rounded-md"><a class="text-gray-300"><list-bullet-icon />Tasks</a></li>
      <li class="hover:bg-gray-700 hover:rounded-md"><a class="text-gray-300"><calendar-icon />Today</a></li>
      <li class="hover:bg-gray-700 hover:rounded-md"><a class="text-gray-300"><calendar-days-icon />Upcoming</a></li>
      <li class="hover:bg-gray-700 hover:rounded-md"><a class="text-gray-300"><calendar-events />Events</a></li>
      <li class="hover:bg-gray-700 hover:rounded-md"><a class="text-gray-300"><check-circle-icon />Completed</a></li>
      <li class="hover:bg-gray-700 hover:rounded-md"><a class="text-gray-300"><goals-icon />Goals</a></li>
    </ul>
    <ul class="menu">
      <li class="menu-title"><a>Categories</a></li>
      <li><a>Clean my room</a></li>
      <li><a>Item 2</a></li>
      <li><a>Item 3</a></li>
    </ul>
  </aside>
</template>

<style scoped>

</style>