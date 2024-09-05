<script setup lang="ts">
interface Props {
  open?: boolean;
  title: string;
}

withDefaults(defineProps<Props>(), {
  open: false,
});

defineEmits(['handle-click-modal', 'handle-submit']);
</script>

<template>
  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-xl font-bold my-3 text-center">
        {{ title }}
      </h3>
      <div class="w-full">
        <form method="dialog" class="space-y-4" @submit.prevent="$emit('handle-submit')">
          <slot name="form" />

          <slot name="actions" />
        </form>
      </div>
    </div>
  </dialog>
  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 transition-opacity w-screen h-screen"
  ></div>
</template>