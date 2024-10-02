import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { AxiosResponse } from 'axios';
import type { Error } from '@/modules/categories/interfaces/categories-list.response';

export const useValidationErrorsStore = defineStore('validation-errors', () => {
  const errors = ref<Error[]>([]);

  function getErrors(response: AxiosResponse): Error[] {
    errors.value = [];
    response.data.errors.forEach((error: Error) => {
      errors.value[error.source] = error.message;
    });
    return errors.value;
  }

  return {
    errors,
    getErrors,
  };
});