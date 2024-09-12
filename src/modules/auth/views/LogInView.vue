<script setup lang="ts">

import { useAuthStore } from '@/modules/auth/stores/auth.store';
import { ref } from 'vue';
import { useValidationErrorsStore } from '@/modules/common/stores/validation-errors.store';

const authStore = useAuthStore();
const errorsStore = useValidationErrorsStore()

</script>

<template>
  <div
    class="space-y-6 p-20 bg-[#121621] flex flex-col items-center justify-center rounded-xl w-[35rem]"
  >
    <div class="flex space-x-4 justify-between items-end">
      <h2 class="text-2xl text-gray-300 md:text-3xl font-extrabold">Log In!</h2>
    </div>
    <div class="w-full">
      <form method="dialog" class="space-y-4" @submit.prevent="authStore.login(authStore.LoginForm)">
        <div class="space-y-1">
          <span class="label-text">Email</span>
          <input
            v-model="authStore.LoginForm.email"
            ref="emailInputRef"
            type="text"
            placeholder="example@example.com"
            class="input input-bordered input-accent w-full"
          />
          <p v-if="errorsStore?.errors['email']" class="text-red-600 text-xs font-semibold">{{ errorsStore.errors['email'] }}</p>
        </div>

        <div class="space-y-1">
          <span class="label-text">Password</span>
          <input
            v-model="authStore.LoginForm.password"
            ref="passwordInputRef"
            type="password"
            placeholder="Password"
            class="input input-bordered input-accent w-full"
          />
          <p v-if="errorsStore?.errors['password']" class="text-red-600 text-xs font-semibold">{{ errorsStore.errors['password'] }}</p>
        </div>

        <div class="flex justify-end">
          <div class="space-x-4">
            <button class="btn btn-accent">Log In</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
