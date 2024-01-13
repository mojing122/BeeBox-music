<template>
    <div>
        <div class="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
            <div class="flex mx-[20px] items-baseline justify-between pt-16 pb-6">
                <h1 class="text-4xl font-bold tracking-tight">推荐歌单</h1>
                <div class="flex items-center">
                    <button @click="router.push('/listsPark')" type="button" class="text-gray-600 dark:text-gray-400">
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
                        <span class="" @click="router.push('/musicsPark')">浏览更多></span>
                    </button>
                </div>
            </div>

            <div>
                <MusicGridList :List="musics" />
            </div>

            <div class="flex mx-[20px] items-baseline justify-between pt-16 pb-6">
                <h1 class="text-4xl font-bold tracking-tight">收藏歌单</h1>
                <div class="flex items-center">
                    <button type="button" class="text-gray-600 dark:text-gray-400">
                        <span class="">浏览更多></span>
                    </button>
                </div>
            </div>

            <div>
                <GridList :List="favouritePlayLists" />
            </div>

        </div>

    </div>
</template>

<script setup>
import GridList from '@/components/index/GridList.vue';
import MusicGridList from './MusicGridList.vue';
import { get, post } from "@/axios/index.js";
import { ref } from 'vue';
import router from "@/router/index.js";


const staticPath = 'http://localhost:8080'

const playLists = ref([
    {
        id: 1,
        name: '每日推荐',
        description: '每日精选推荐',
        cover:
            'http://localhost:8080/cover/recommend.jpg',
    }

])

const favouritePlayLists = ref([
])

const musics = ref([])


get(
    "/api/playlist/get-playlist?limit=3&offset=0",
    (message) => {
        for (let i = 0; i < 3; i++) {
            let item = {}
            item.id = message[i].id;
            item.name = message[i].name;
            item.description = message[i].description;
            item.cover = staticPath + message[i].cover;
            playLists.value.push(item)
        }

    }

);

post(
    "/api/music/get-musicList-by-likeCount",
    {
        limit: 8,
        offset: 0
    },
    (message) => {
        for (let i = 0; i < 8; i++) {
            let item = {}
            item.id = message[i].id;
            item.name = message[i].name;
            item.description = message[i].desc;
            item.cover = staticPath + message[i].cover;
            item.file_url = staticPath + message[i].fileUrl;
            item.is_liked = message[i].isLiked;
            item.artist = message[i].artist;
            musics.value.push(item)
        }

    }
);

get(
    "/api/playlist/show-my-favourite-playlist",
    (message) => {
        for (let i = 0; i < message.length; i++) {
            let item = {}
            item.id = message[i].id;
            item.name = message[i].name;
            item.description = message[i].description;
            item.cover = staticPath + message[i].cover;
            favouritePlayLists.value.push(item)
        }

    }

);

</script>

<style scoped></style>