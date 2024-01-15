<template>
    <ul role="list" class="mx-[20px] grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-8">
        <li v-for="item in List" :key="item.id" class="relative" @click="PlayMusic(item)">
            <div
                class="group aspect-h-7 aspect-w-10 block w-full aspect-square overflow-hidden rounded-full bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                <img :src="item.cover" alt=""
                    class="pointer-events-none w-full object-cover group-hover:opacity-75  aspect-square" />
                <button type="button" class="absolute inset-0 focus:outline-none">
                    <span class="sr-only">浏览更多 {{ item.name }}</span>
                </button>
            </div>
            <p
                class="text-center text-[14px] text-gray-800 dark:text-gray-200 pointer-events-none mt-2 block truncate text-sm font-medium">
                {{
                    item.name }}
            </p>
            <p class="text-center pointer-events-none block text-xs font-medium text-gray-500">{{ item.artist }}</p>
        </li>
    </ul>
</template>

<script setup>
defineProps(['List'])

import router from "@/router";
import { useStore } from "@/stores/index.js";
import { post } from "../../axios";
import { getCurrentInstance } from "vue";

const con = getCurrentInstance();
const staticPath = con.appContext.config.globalProperties.$staticPath;

const store = useStore();

const PlayMusic = (item) => {
    post('/api/music/get-music-by-id', {
        music_id: item.id
    }, (message) => {
        store.currentPaly.id = message.id;
        store.currentPaly.name = message.name;
        store.currentPaly.artist = message.artist;
        store.currentPaly.cover = staticPath + message.cover;
        store.currentPaly.file_url = staticPath + message.fileUrl;
        store.currentPaly.isLiked = message.isLiked
    });

}

</script>

<style scoped>
li {
    border: none;
}
</style>