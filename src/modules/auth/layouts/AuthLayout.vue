<script setup lang="ts">
</script>

<template>
  <div class="navbar bg-[#121621] fixed flex justify-between">
    <div>
      <router-link :to="{name: 'welcome'}" class="btn btn-ghost text-xl font-extrabold">TODO<span class="font-normal">app</span></router-link>
    </div>
    <div class="space-x-8 px-4">
      <router-link :to="{name: 'login'}" class="text-md uppercase font-bold hover:underline hover:text-white">Log In</router-link>
      <router-link :to="{name: 'register'}" class="text-md uppercase font-bold hover:underline hover:text-white">Register</router-link>
    </div>
  </div>
  <div class="bg-[#171C28] flex min-h-screen">
    <main class="m-auto">
      <div>
        <div class="max-w-4xl">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>