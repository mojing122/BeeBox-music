<template>
  <div class="bg-white dark:bg-gray-800 h-[100vh]"><Navbar /></div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "@/stores/index.js";
import Navbar from "../components/welcome/Index/Navbar.vue";

const store = useStore();
</script>

<style lang="scss"></style>
