<template>
    <div>
        <div class="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
            <div class="flex mx-[20px] items-baseline justify-between pt-16 pb-6">
                <h1 class="text-4xl font-bold tracking-tight">所有歌单</h1>
                <div class="flex items-center">
                </div>
            </div>

            <div>
                <GridList :List="playLists" />
            </div>
        </div>
    </div>
</template>

<script setup>
import GridList from '@/components/index/GridList.vue';
import { get, post } from "@/axios/index.js";
import { ref, getCurrentInstance } from 'vue';

const con = getCurrentInstance();
const staticPath = con.appContext.config.globalProperties.$staticPath;

const playLists = ref([


])


get(
    "/api/playlist/get-playlist?limit=100&offset=0",
    (message) => {
        for (let i = 0; i < message.length; i++) {
            let item = {}
            item.id = message[i].id;
            item.name = message[i].name;
            item.description = message[i].description;
            item.cover = staticPath + message[i].cover;
            playLists.value.push(item)
        }

    }

);
</script>

<style lang="scss" scoped></style>