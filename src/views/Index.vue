<template>
  <div class="bg-white dark:bg-gray-800 h-[100vh] overflow-hidden">
    <Navbar />
    <div class="h-full overflow-scroll">
      <RouterView class="" />
      <div class="h-[20rem]"></div>
    </div>
    <Player class="absolute inset-x-0 bottom-0" />
  </div>
</template>

<script setup>
import { useStore } from "@/stores/index.js";
import Navbar from "@/components/index/Navbar.vue";
import Player from "@/components/index/Player.vue";

const store = useStore();
</script>

<style lang="scss"></style>
