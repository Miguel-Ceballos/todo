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
    const response = await tasksStore.updateTask(taskFormStore.form);
    if (response === 200) {
      modalStore.handleClickModal();
      return;
    }
  } else {
    const response = await tasksStore.postTasks(taskFormStore.form);
    if (response === 201) {
      modalStore.handleClickModal();
      return;
    }
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
      <button class="btn btn-accent">{{ modalStore.isUpdate ? 'Update' : 'Save' }}</button>
    </template>
  </modal>
</template>

<style scoped></style>
