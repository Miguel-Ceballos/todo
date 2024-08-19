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
  <aside class="bg-gray-800 w-72 h-[100vh]">
    <div class="space-y-4 my-4">
      <h2 class="text-xl font-bold text-center">
        <router-link to="/">TODOApp</router-link>
      </h2>
    </div>
    <ul class="menu">
      <li><create-button text="New Category" /></li>
      <li><a><list-bullet-icon />Tasks</a></li>
      <li><a><calendar-icon />Today</a></li>
      <li><a><calendar-days-icon />Upcoming</a></li>
      <li><a><calendar-events />Events</a></li>
      <li><a><check-circle-icon />Completed</a></li>
      <li><a><goals-icon />Goals</a></li>
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