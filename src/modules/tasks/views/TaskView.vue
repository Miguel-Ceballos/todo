<script setup lang="ts">

import CreateButton from '@/modules/common/components/CreateButton.vue'
import Modal from '@/modules/common/components/Modal.vue'
import { ref } from 'vue'
import CheckedIcon from '@/modules/common/icons/CheckedIcon.vue'
import CheckCircleIcon from '@/modules/common/icons/CheckCircleIcon.vue'

const oModal = ref(false)

const handleClickModal = () => {
  oModal.value = !oModal.value
}


</script>

<template>
<!--  <div class="bg-[#171C28]  w-full h-screen">-->
  <div class="bg-[#171C28]  w-full h-screen">
    <div class="max-w-4xl overflow-x-hidden px-10 lg:mx-auto my-6 sm:my-16">
      <div class="space-y-6">
        <div class="flex space-x-4 justify-between items-end">
          <h2 class="text-2xl text-gray-300 md:text-3xl font-bold">Tasks</h2>
          <p class="text-sm pr-4 flex justify-center items-center gap-1">
            <check-circle-icon />
            4 Tasks
          </p>
        </div>
        <div>
          <create-button @click="handleClickModal" text="New Task" />
          <modal :open="oModal" @handle-click-modal="handleClickModal" />
        </div>
        <ul>
          <li class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md">
            <div class="flex w-full space-x-2">
              <div class="mt-1">
                <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2" />
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
          <li class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md">
            <div class="flex w-full space-x-2">
              <div class="mt-1">
                <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2" />
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
          <li class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md">
            <div class="flex w-full space-x-2">
              <div class="mt-1">
                <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2" />
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
          <li class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md">
            <div class="flex w-full space-x-2">
              <div class="mt-1">
                <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2" />
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
          <li class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md">
            <div class="flex w-full space-x-2">
              <div class="mt-1">
                <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2" />
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
          <li class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md">
            <div class="flex w-full space-x-2">
              <div class="mt-1">
                <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2" />
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
          <li class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md">
            <div class="flex w-full space-x-2">
              <div class="mt-1">
                <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2" />
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
          <li class="border-b hover:scale-[1.003] border-gray-800 hover:cursor-pointer hover:dark:bg-[#1E2330] px-1 py-2 rounded-t-md">
            <div class="flex w-full space-x-2">
              <div class="mt-1">
                <input type="checkbox" class="checkbox checkbox-primary rounded-full checkbox-sm hover:border-2" />
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
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>