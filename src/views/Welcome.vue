<template>
  <div
    class="w-[100vw] h-[100vh] text-slate-900 dark:text-white dark:bg-gray-900"
  >
    <router-view class="z-30" style="position: relative" />
  </div>

  <!--深色模式切换按钮-->
  <div class="absolute top-4 right-8 z-40">
    <button
      class="w-8 h-8 border-[0.5px] border-solid rounded-full border-gray-800 p-2 dark:border-gray-400"
      @click="darkMode"
    >
      <svg
        v-if="store.theme.themeMode == 'dark'"
        t="1693224239075"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5378"
        width="90%"
        height="90%"
        style="margin-top: 5%; margin-left: 5%"
      >
        <path
          d="M185.335 178.178l-2.742-2.384c-13.39-11.534-14.895-31.74-3.36-45.13a32 32 0 0 1 4.324-4.158C249.354 74.17 337.575 48 448.22 48 704.358 48 912 255.74 912 512l-0.062 7.673C907.842 772.394 701.797 976 448.22 976c-110.645 0-198.866-26.169-264.663-78.506a32 32 0 0 1-4.325-4.159c-11.419-13.256-10.058-33.192 2.962-44.78l0.399-0.35 2.742-2.383c89.13-78.201 134.016-188.043 134.66-329.525L320 512c0.253-143.557-44.635-254.831-134.665-333.822z"
          fill="#828282"
          p-id="5379"
        ></path>
      </svg>
      <svg
        v-if="store.theme.themeMode == 'light'"
        t="1693224341430"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1424"
      >
        <path
          d="M512 224c159.058 0 288 128.942 288 288S671.058 800 512 800 224 671.058 224 512s128.942-288 288-288z m0 640c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32zM263.098 760.902c12.497 12.496 12.497 32.758 0 45.254l-45.254 45.255c-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255l45.255-45.254c12.496-12.497 32.758-12.497 45.254 0z m543.058 0l45.255 45.254c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-45.254-45.255c-12.497-12.496-12.497-32.758 0-45.254 12.496-12.497 32.758-12.497 45.254 0zM128 480c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H64c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64z m832 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32h-64c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64zM217.844 172.589l45.254 45.255c12.497 12.496 12.497 32.758 0 45.254-12.496 12.497-32.758 12.497-45.254 0l-45.255-45.254c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0z m633.567 0c12.497 12.497 12.497 32.758 0 45.255l-45.255 45.254c-12.496 12.497-32.758 12.497-45.254 0-12.497-12.496-12.497-32.758 0-45.254l45.254-45.255c12.497-12.497 32.758-12.497 45.255 0zM512 32c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32z"
          fill="#000000"
          p-id="1425"
        ></path>
      </svg>
      <svg
        v-if="store.theme.themeMode == 'auto'"
        t="1693224438999"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="8129"
      >
        <path
          d="M462.933333 539.733333l98.133333 0-49.066667-155.733333-49.066667 155.733333zM853.333333 370.56l0-199.893333-199.893333 0-141.44-141.44-141.44 141.44-199.893333 0 0 199.893333-141.44 141.44 141.44 141.44 0 199.893333 199.893333 0 141.44 141.44 141.44-141.44 199.893333 0 0-199.893333 141.44-141.44-141.44-141.44zM610.133333 682.666667l-29.866667-85.333333-136.533333 0-29.866667 85.333333-81.066667 0 136.533333-384 85.333333 0 136.533333 384-81.066667 0z"
          fill="#747474"
          p-id="8130"
        ></path>
      </svg>
    </button>
  </div>

  <!--背景-->
  <div>
    <div class="dark:hidden">
      <div
        class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
      <div
        class="absolute inset-x-0 top-[calc(60%-20rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(60%-30rem)]"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
    </div>
    <div class="hidden dark:block">
      <div
        class="absolute inset-x-0 top-[-10rem] z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@/stores/index.js";

const store = useStore();

const darkMode = () => {
  if (store.theme.themeMode == "light") {
    store.theme.themeMode = "dark";
  } else if (store.theme.themeMode == "auto") {
    store.theme.themeMode = "light";
  } else {
    store.theme.themeMode = "auto";
  }
  changeTheme();
};

const changeTheme = () => {
  if (
    store.theme.themeMode == "dark" ||
    (store.theme.themeMode == "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

changeTheme();
</script>

<style lang="scss" scoped></style>
