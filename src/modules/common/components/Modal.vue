<script setup lang="ts">
interface Props {
  open?: boolean
}

withDefaults(defineProps<Props>(), {
  open: false
})

defineEmits(['handle-click-modal'])

// const emits = defineEmits<{
//   close: [void]
// }>()

</script>

<template>
  <!-- Open the modal using ID.showModal() method -->

  <dialog class="modal" :open="open">
    <div class="modal-box">
      <h3 class="text-xl font-bold mb-2">New Task</h3>
      <div class="w-full">
        <form method="dialog" class="space-y-4">
          <div class="space-y-1">
            <span class="label-text">Title</span>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-accent w-full"
            />
          </div>
          <div class="space-y-1">
            <span class="label-text">Description</span>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered input-accent w-full"
            />
          </div>
          <div class="space-y-1">
            <span class="label-text">Category</span>
            <select class="select select-accent w-full">
              <option disabled selected>Dark mode or light mode?</option>
              <option>Auto</option>
              <option>Dark mode</option>
              <option>Light mode</option>
            </select>
          </div>
          <div class="flex justify-end space-x-4">
            <button class="btn btn-neutral" @click="$emit('handle-click-modal')">Close</button>
            <button class="btn btn-accent" @click="">Save</button>
          </div>
        </form>
      </div>
    </div>
  </dialog>
  <div v-if="open" class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-50 transition-opacity w-screen h-screen"></div>
</template>