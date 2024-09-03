import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAlertStore = defineStore('alert', () => {
  const showAlert = ref(false);
  const message = ref('');

  const handleClickAlert = (InputMessage: string) => {
    showAlert.value = true;
    message.value = InputMessage;
    setTimeout(() => {
      showAlert.value = false;
      message.value = '';
    }, 3000);
  };

  return {
    showAlert,
    message,
    handleClickAlert,
  };
});
