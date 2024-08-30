<script setup lang="ts">
import Modal from '@/modules/common/components/Modal.vue';
import CreateButton from '@/modules/common/components/CreateButton.vue';
import { reactive, ref } from 'vue';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';
import { useTasksStore } from '@/modules/tasks/store/tasks.store';
import type { Status } from '@/modules/tasks/interfaces/tasks-list.response'
import type { Form } from '@/modules/tasks/interfaces/task.interface'

const oModal = ref(false);

const form = reactive(<Form>{});

const categoryStore = useCategoriesStore();
const tasksStore = useTasksStore();

const clearForm = () => {
  form.title = '';
  form.description = '';
  form.status = <Status>'P';
  form.category = null;
};

const handleClickModal = () => {
  clearForm();
  oModal.value = !oModal.value;
};

const handleSubmit = async () => {
  const response = await tasksStore.postTasks(form);

  if (response === 201) {
    handleClickModal();
    return;
  }

  console.log(response);
};
</script>

<template>
  <create-button @click="handleClickModal" text="New Task" />
  <modal
    :open="oModal"
    @handle-click-modal="handleClickModal"
    @handle-submit="handleSubmit"
  >
    <template #form>
      <div class="space-y-1">
        <span class="label-text">Title</span>
        <input
          type="text"
          placeholder="Task title"
          class="input input-bordered input-accent w-full"
          v-model="form.title"
        />
      </div>
      <div class="space-y-1">
        <span class="label-text">Description</span>
        <textarea
          class="textarea textarea-bordered textarea-accent w-full"
          placeholder="Task description (optional)"
          v-model="form.description"
        ></textarea>
      </div>
      <div class="space-y-1">
        <span class="label-text">Status</span>
        <select class="select select-accent w-full" v-model="form.status">
          <option selected value="P">To Do</option>
          <option value="D">In Progress</option>
          <option value="C">Done</option>
        </select>
      </div>
      <div class="space-y-1">
        <span class="label-text">Category</span>
        <select class="select select-accent w-full" v-model="form.category">
          <option disabled selected value="null">Select category</option>
          <option
            v-for="category in categoryStore.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
    </template>

    <template #actions>
      <button class="btn btn-accent">Save</button>
    </template>
  </modal>
</template>

<style scoped></style>
