<script setup lang="ts">
import Plus from '@/modules/common/icons/Plus.vue'
import PlusIcon from '@/modules/common/icons/PlusIcon.vue'

defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="">
    <button class="flex group gap-2 items-center">
      <plus-icon />
      <p class="text-accent font-bold">{{ text }}</p>
    </button>
  </div>
</template>