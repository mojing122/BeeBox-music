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
      name: "暂无播放",
      artist: "未知歌手",
      cover: "/default_cover.jpeg",
      file_url: "",
      currentTime: 0,
      length: 0,
      palying: false,
      isLiked: false,
    });

    return { auth, theme, currentPaly };
  },
  {
    persist: true,
  }
);
