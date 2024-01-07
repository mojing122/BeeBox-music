import { defineStore } from "pinia";
import { reactive } from "vue";

export const useStore = defineStore(
  "store",
  () => {
    const auth = reactive({
      user: null,
    });

    const theme = reactive({
      themeMode: "auto",
    });
    return { auth, theme };
  },
  {
    persist: true,
  }
);
