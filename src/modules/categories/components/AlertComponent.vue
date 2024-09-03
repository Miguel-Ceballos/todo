<script setup lang="ts">
import { useAlertStore } from '@/modules/common/stores/alert.store'

const alertStore = useAlertStore();
</script>

<template>
  <div v-if="alertStore.showAlert" role="alert" class="alert border-2 bg-[#171C28] border-green-400 fixed bottom-10 right-10 z-50 w-96">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 shrink-0 stroke-current text-green-400"
      fill="none"
      viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span class="text-green-400">{{alertStore.message}}</span>
  </div>
</template>