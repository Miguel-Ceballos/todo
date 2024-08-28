<script setup lang="ts">

import { useCategoriesStore } from '@/modules/categories/stores/categories.store'
import { ref } from 'vue'


const categoryTitle = ref('')
const categoryStore = useCategoriesStore()

defineEmits(['handle-category-form'])

</script>

<template>
  <form class="flex flex-col w-full space-y-1" @submit.prevent="categoryStore.postCategory(categoryTitle)">
    <input type="text" placeholder="Category title" class="input input-bordered input-accent input-sm w-full" v-model="categoryTitle"/>
    <div class="flex w-full justify-end items-end space-x-2">
      <button class="btn btn-neutral btn-sm" @click="$emit('handle-category-form')">Cancel</button>
      <button class="btn btn-accent btn-sm" @Click="categoryStore.postCategory('New Category')">Add</button>
    </div>
  </form>
</template>
