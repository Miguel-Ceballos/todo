<script setup lang="ts">

import { useAuthStore } from '@/modules/auth/stores/auth.store';

const authStore = useAuthStore();

</script>

<template>
  <div
    class="space-y-6 p-20 bg-[#121621] flex flex-col items-center justify-center rounded-xl w-[35rem]"
  >
    <div class="flex space-x-4 justify-between items-end">
      <h2 class="text-2xl text-gray-300 md:text-3xl font-extrabold">Register!</h2>
    </div>
    <div class="w-full">
      <form method="dialog" class="space-y-4" @submit.prevent="authStore.register(authStore.RegisterForm)">
        <div class="space-y-1">
          <span class="label-text">Name</span>
          <input
            v-model="authStore.RegisterForm.name"
            type="text"
            placeholder="Name"
            class="input input-bordered input-accent w-full"
          />
        </div>

        <div class="space-y-1">
          <span class="label-text">Email</span>
          <input
            v-model="authStore.RegisterForm.email"
            type="text"
            placeholder="example@example.com"
            class="input input-bordered input-accent w-full"
          />
        </div>

        <div class="space-y-1">
          <span class="label-text">Password</span>
          <input
            v-model="authStore.RegisterForm.password"
            type="password"
            placeholder="Password"
            class="input input-bordered input-accent w-full"
          />
        </div>

        <div class="flex justify-end">
          <div class="space-x-4">
            <button class="btn btn-accent">Register</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
