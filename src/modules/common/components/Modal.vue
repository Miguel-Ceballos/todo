<script setup lang="ts">
interface Props {
  open?: boolean
}

withDefaults(defineProps<Props>(), {
  open: false
})

defineEmits(['handle-click-modal', 'handle-submit'])

</script>

<template>
  <!-- Open the modal using ID.showModal() method -->

  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-xl font-bold mb-2">New Task</h3>
      <div class="w-full">
        <form method="dialog" class="space-y-4" @submit.prevent="$emit('handle-submit')">
          <slot name="form" />
          <div class="flex justify-end space-x-4">
            <button type="button" class="btn btn-neutral" @click="$emit('handle-click-modal')">Close</button>
            <slot name="actions" />
          </div>
        </form>
      </div>
    </div>
  </dialog>
  <div v-if="open" class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 transition-opacity w-screen h-screen"></div>
</template>