<script setup lang="ts">

import Modal from '@/modules/common/components/Modal.vue'
import CreateButton from '@/modules/common/components/CreateButton.vue'
import { ref } from 'vue'

const oModal = ref(false)

const handleClickModal = () => {
  oModal.value = !oModal.value
}

</script>

<template>
  <create-button @click="handleClickModal" text="New Task" />
  <modal :open="oModal" @handle-click-modal="handleClickModal">
    <template #form>
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
    </template>

    <template #actions>
      <button class="btn btn-accent">Save</button>
    </template>
  </modal>
</template>

<style scoped>

</style>