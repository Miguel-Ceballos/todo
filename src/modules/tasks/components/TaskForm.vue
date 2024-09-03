<script setup lang="ts">
import Modal from '@/modules/common/components/Modal.vue';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';
import { useTasksStore } from '@/modules/tasks/store/tasks.store';
import { useModalStore } from '@/modules/common/stores/modal.store';
import { useTaskFormStore } from '@/modules/tasks/store/task-form.store';

const categoryStore = useCategoriesStore();
const tasksStore = useTasksStore();
const modalStore = useModalStore();
const taskFormStore = useTaskFormStore();

const handleSubmit = async () => {
  if (modalStore.isUpdate === true) {
    await tasksStore.updateTask(taskFormStore.form);
  } else {
    await tasksStore.postTasks(taskFormStore.form);
  }
};
</script>

<template>
  <modal
    :open="modalStore.oModal"
    @handle-click-modal="modalStore.handleClickModal"
    @handle-submit="handleSubmit"
  >
    <template #form>
      <div class="space-y-1">
        <span class="label-text">Title</span>
        <input
          type="text"
          placeholder="Task title"
          class="input input-bordered input-accent w-full"
          v-model="taskFormStore.form.title"
        />
      </div>
      <div class="space-y-1">
        <span class="label-text">Description</span>
        <textarea
          class="textarea textarea-bordered textarea-accent w-full"
          placeholder="Task description (optional)"
          v-model="taskFormStore.form.description"
        ></textarea>
      </div>
      <div class="space-y-1">
        <span class="label-text">Status</span>
        <select class="select select-accent w-full" v-model="taskFormStore.form.status">
          <option selected value="P">To Do</option>
          <option value="D">In Progress</option>
          <option value="C">Done</option>
        </select>
      </div>
      <div class="space-y-1">
        <span class="label-text">Category</span>
        <select class="select select-accent w-full" v-model="taskFormStore.form.category.id">
          <option selected :value="0">Select category</option>
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
      <div>
        <button type="button" class="btn" @click="tasksStore.deleteTask(taskFormStore.form.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>

          Delete
        </button>
      </div>
      <div class="space-x-4">
        <button type="button" class="btn btn-neutral" @click="modalStore.handleClickModal()">
          Close
        </button>
        <button class="btn btn-accent">{{ modalStore.isUpdate ? 'Update' : 'Save' }}</button>
      </div>
    </template>
  </modal>
</template>

<style scoped></style>
