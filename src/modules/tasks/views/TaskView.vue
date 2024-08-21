<script setup lang="ts">

import CreateButton from '@/modules/common/components/CreateButton.vue'
import Modal from '@/modules/common/components/Modal.vue'
import { ref } from 'vue'

const oModal = ref(false)

const handleClickModal = () => {
  oModal.value = !oModal.value
}


</script>

<template>
  <div class="max-w-4xl overflow-x-hidden px-10 lg:mx-auto my-6 sm:my-16">
    <div class="space-y-6">
      <div>
        <h2 class="text-2xl text-gray-300 md:text-3xl font-bold">Tasks</h2>
      </div>
      <div>
        <create-button @click="handleClickModal" text="New Task" />
        <modal :open="oModal" @handle-click-modal="handleClickModal"/>
      </div>
      <ul class="space-y-2">
        <li class="border-b border-gray-700">
          <div class="flex w-full space-x-2">
            <div class="mt-1">
              <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm" />
            </div>
            <div class="w-full overflow-hidden">
              <div class="flex flex-col">
                <h3 class="text-gray-200 text-sm mb-1">Lorem ipsum dolor sit amet, consectetur.</h3>
                <p class="truncate text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
                  aspernatur consequuntur distinctio dolorum eius fugit id illum modi nostrum quisquam tempora,
                  voluptatibus. Ad cum cumque enim obcaecati odio quisquam voluptate.
                </p>
              </div>
              <div class="flex justify-end">
                <button class="btn btn-ghost btn-xs justify-end">#Home</button>
              </div>
            </div>
          </div>
        </li>
        <li class="border-b border-gray-700">
          <div class="flex w-full space-x-2">
            <div class="mt-1">
              <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm" />
            </div>
            <div class="w-full overflow-hidden">
              <div class="flex flex-col">
                <h3 class="text-gray-200 text-sm mb-1">Lorem ipsum dolor sit amet, consectetur.</h3>
                <p class="text-xs hidden"></p>
              </div>
              <div class="flex w-full justify-end">
                <button class="btn btn-ghost btn-xs justify-end">#Home</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>