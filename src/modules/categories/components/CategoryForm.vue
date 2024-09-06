<script setup lang="ts">

import { useCategoriesStore } from '@/modules/categories/stores/categories.store'
import Modal from '@/modules/common/components/Modal.vue'
import { useCategoryFormStore } from '@/modules/categories/stores/category-form.store'
import { useModalStore } from '@/modules/common/stores/modal.store'
import { useValidationErrorsStore } from '@/modules/common/stores/validation-errors.store';

const categoryStore = useCategoriesStore()
const modalStore = useModalStore()
const categoryFormStore = useCategoryFormStore()
const errorsStore = useValidationErrorsStore()

const handleSubmit = async () => {
  if (modalStore.isUpdate === true) {
    await categoryStore.updateCategory(categoryFormStore.form);
  } else {
    await categoryStore.postCategory(categoryFormStore.form);
  }
};

</script>

<template>
  <modal
    :open="modalStore.isCategoryModal"
    title="New Category"
    @handle-click-modal="modalStore.handleCategoryModal"
    @handle-submit="handleSubmit"
  >
    <template #form>
      <div class="space-y-1">
        <span class="label-text">Title</span>
        <input
          type="text"
          placeholder="Category title"
          class="input input-bordered input-accent w-full"
          v-model="categoryFormStore.form.title"
        />
        <p v-if="errorsStore?.errors['data.attributes.title']" class="text-red-600 text-xs font-semibold">{{ errorsStore.errors['data.attributes.title'] }}</p>
      </div>
    </template>

    <template #actions>
      <div class="flex justify-end">
        <div class="space-x-4">
          <button type="button" class="btn btn-neutral" @click="modalStore.handleCategoryModal()">
            Close
          </button>
          <button class="btn btn-accent">{{ modalStore.isUpdate ? 'Update' : 'Save' }}</button>
        </div>
      </div>
    </template>
  </modal>
</template>
