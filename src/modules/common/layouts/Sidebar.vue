<script setup lang="ts">

import CreateButton from '@/modules/common/components/CreateButton.vue'
import ListBulletIcon from '@/modules/common/icons/ListBulletIcon.vue'
import CalendarIcon from '@/modules/common/icons/CalendarIcon.vue'
import CalendarDaysIcon from '@/modules/common/icons/CalendarDaysIcon.vue'
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue'
import GoalsIcon from '@/modules/common/icons/GoalsIcon.vue'
import CalendarEvents from '@/modules/common/icons/CalendarEvents.vue'
import HashtagIcon from '@/modules/common/icons/HashtagIcon.vue'
</script>

<template>
  <aside class="bg-[#121621] min-w-72 h-[100vh] hidden lg:inline">
    <div class="space-y-4 my-4">
      <h2 class="text-xl font-bold text-center text-purple-500">
        <router-link to="/">TODOApp</router-link>
      </h2>
    </div>
    <ul class="menu">
      <li class="hover:bg-zincs-800 hover:rounded-md group"><create-button text="New" /></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><list-bullet-icon />Tasks</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><calendar-icon />Today</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><calendar-days-icon />Upcoming</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><calendar-events />Events</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><check-circle-icon />Completed</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><goals-icon />Goals</a></li>
    </ul>
    <ul class="menu">
      <li class="menu-title"><a>Categories</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md group"><create-button text="New Category" /></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><hashtag-icon  size="6"/>Tasks</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><hashtag-icon  size="6"/>Today</a></li>
      <li class="hover:bg-zincs-800 hover:rounded-md"><a class="text-gray-400 hover:text-gray-100"><hashtag-icon  size="6"/>Upcoming</a></li>
    </ul>
  </aside>
</template>

<style scoped>

</style>