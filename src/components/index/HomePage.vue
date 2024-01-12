<template>
    <div>
        <div class="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
            <div class="flex mx-[20px] items-baseline justify-between pt-16 pb-6">
                <h1 class="text-4xl font-bold tracking-tight">推荐歌单</h1>
                <div class="flex items-center">
                    <button type="button" class="text-gray-600 dark:text-gray-400">
                        <span class="">浏览更多></span>
                    </button>
                </div>
            </div>

            <div>
                <GridList :List="playLists" />
            </div>

            <div class="flex mx-[20px] items-baseline justify-between pt-16 pb-6">
                <h1 class="text-4xl font-bold tracking-tight">热门单曲</h1>
                <div class="flex items-center">
                    <button type="button" class="text-gray-600 dark:text-gray-400">
                        <span class="">浏览更多></span>
                    </button>
                </div>
            </div>

            <div>
                <GridList :List="musics" />
            </div>
        </div>
    </div>
</template>

<script setup>
import GridList from '@/components/index/GridList.vue';
import { get, post } from "@/axios/index.js";
import { ref } from 'vue';
const staticPath = 'http://localhost:8080'

const playLists = ref([
    {
        id: 1,
        name: '每日推荐',
        description: '每日精选推荐',
        cover:
            'http://localhost:8080/cover/recommend.jpg',
    },
    {
        id: 2,
        name: 'null',
        description: 'null',
        cover:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        id: 3,
        name: 'null',
        description: 'null',
        cover:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        id: 4,
        name: 'null',
        description: 'null',
        cover:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },

])

const musics = ref([
    {
        id: 1,
        name: '每日推荐',
        description: '每日精选推荐',
        cover:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        id: 2,
        name: 'null',
        description: 'null',
        cover:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        id: 3,
        name: 'null',
        description: 'null',
        cover:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    {
        id: 4,
        name: 'null',
        description: 'null',
        cover:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },

])


get(
    "/api/playlist/get-playlist?limit=3&offset=0",
    (message) => {
        console.log(message)
        for (let i = 0; i < 3; i++) {
            playLists.value[i + 1].id = message[i].id;
            playLists.value[i + 1].name = message[i].name;
            playLists.value[i + 1].description = message[i].desc;
            playLists.value[i + 1].cover = staticPath + message[i].cover;
        }

    }
);

</script>

<style scoped></style>