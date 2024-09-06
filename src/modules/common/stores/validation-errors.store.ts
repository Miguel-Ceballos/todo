import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useValidationErrorsStore = defineStore('validation-errors', () => {
  const errors = ref<string[]>([]);

  interface ValidationError {
    status: number;
    message: string;
    source: string;
  }

  function getErrors(response: any) {
    errors.value = [];
    response.data.errors.forEach((error: ValidationError) => {
      errors.value[error.source] = error.message;
    });
    return errors;
  }

  return {
    errors,
    getErrors,
  };
});