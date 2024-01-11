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

    const currentPaly = reactive({
      music: "青花瓷",
    });

    return { auth, theme, currentPaly };
  },
  {
    persist: true,
  }
);
