<script setup lang="ts">
import Modal from '@/modules/common/components/Modal.vue';
import { useCategoriesStore } from '@/modules/categories/stores/categories.store';
import { useTasksStore } from '@/modules/tasks/store/tasks.store';
import { useModalStore } from '@/modules/common/stores/modal.store';
import { useTaskFormStore } from '@/modules/tasks/store/task-form.store';
import TrashIcon from '@/modules/common/icons/TrashIcon.vue'
import { useValidationErrorsStore } from '@/modules/common/stores/validation-errors.store';
import { onMounted, ref } from 'vue';

const categoryStore = useCategoriesStore();
const tasksStore = useTasksStore();
const modalStore = useModalStore();
const taskFormStore = useTaskFormStore();
const errorsStore = useValidationErrorsStore();

const isDisabled = ref(false)

interface Props {
  categoryId?: number;
  isTaskByCategory?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isTaskByCategory: false,
});

const handleSubmit = async () => {
  disabledButton();
  if (modalStore.isUpdate) {
    await tasksStore.updateTask(taskFormStore.form, props.isTaskByCategory);
  } else {
    await tasksStore.postTasks(taskFormStore.form, props.isTaskByCategory);
  }
};

const disabledButton = () => {
  setTimeout(() => {
    isDisabled.value = true
  }, 2000)
  isDisabled.value = false
}

onMounted(async () => {
  console.log(taskFormStore.form);
  if (props.categoryId) {
    taskFormStore.form.category.id = props.categoryId;
    console.log({ categoryId: props.categoryId, category: taskFormStore.form.category.id });
  }
});
</script>

<template>
  <modal
    :open="modalStore.isTaskModal"
    :title="modalStore.isUpdate ? 'Update Task' : 'New Task'"
    @handle-click-modal="modalStore.handleTaskModal"
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
        <p v-if="errorsStore?.errors['data.attributes.title']" class="text-red-600 text-xs font-semibold">{{ errorsStore.errors['data.attributes.title'] }}</p>
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
        <select class="select select-accent w-full" v-model="taskFormStore.form.status" >
          <option selected value="P">To Do</option>
          <option value="D">In Progress</option>
          <option value="C">Done</option>
        </select>
        <p v-if="errorsStore?.errors['data.attributes.status']" class="text-red-600 text-xs font-semibold">{{ errorsStore.errors['data.attributes.status'] }}</p>
      </div>
      <div class="space-y-1">
        <span class="label-text">Category</span>
        <select class="select select-accent w-full" v-model="taskFormStore.form.category.id" >
          <option selected :value="0">Select category</option>
          <option
            v-for="category in categoryStore.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <p v-if="errorsStore?.errors['data.relationships.category.data.id']" class="text-red-600 text-xs font-semibold">{{ errorsStore.errors['data.relationships.category.data.id'] }}</p>
      </div>

      <div class="space-y-1">
        <span class="label-text">Due date</span>
        <input
          type="date"
          class="input input-bordered input-accent w-full"
          v-model="taskFormStore.form.due_date"
        />
        <p v-if="errorsStore?.errors['data.attributes.due_date']" class="text-red-600 text-xs font-semibold">{{ errorsStore.errors['data.attributes.due_date'] }}</p>
      </div>
    </template>

    <template #actions>
      <div :class="modalStore.isUpdate ? 'flex justify-between' : 'flex justify-end'">
        <div v-if="modalStore.isUpdate">
          <button type="button" class="btn" @click="tasksStore.deleteTask(taskFormStore.form.id)">
            <trash-icon />
            Delete
          </button>
        </div>
        <div class="space-x-4">
          <button type="button" class="btn btn-neutral" @click="modalStore.handleTaskModal()">
            Close
          </button>
          <button class="btn btn-accent">{{ modalStore.isUpdate ? 'Update' : 'Save' }}</button>
        </div>
      </div>
    </template>
  </modal>
</template>

<style scoped></style>
