<template>
    <div>
        <div class="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
            <div class="max-w-xl lg:max-w-lg float-end pr-10">
                <div class="mt-6 flex max-w-md gap-x-4 right-0 ">
                    <label for="email-address" class="sr-only">搜索</label>
                    <el-input v-model="keyword" id="keyword" name="keyword" type="keyword" autocomplete="keyword"
                        required="" class="min-w-0 flex-auto rounded-md  sm:text-sm sm:leading-6" placeholder="关键词" />
                    <button type="submit" @click="router.push({ path: '/searchResult', query: { keyword: keyword } })"
                        class="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-primary_l focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">搜索</button>
                </div>
            </div>
            <div class="flex mx-[20px] items-baseline justify-between pb-6 w-full ">
                <h1 class="text-4xl font-bold tracking-tight">热门单曲</h1>
                <div class="flex items-center">
                    <button type="button" class="text-gray-600 dark:text-gray-400">
                    </button>
                </div>
            </div>

            <div>
                <MusicGridList :List="musics" />
            </div>

            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm float-end mr-4 mt-4 pb-80"
                aria-label="Pagination">
                <a href="javascript:void(0)" @click="currentPage--; getPage()"
                    :class="currentPage == 1 ? 'pointer-events-none' : ''"
                    class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Previous</span>
                    <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                </a>
                <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                <a href="javascript:void(0)" @click="currentPage = pageNum; getPage()" aria-current="page"
                    v-for="pageNum in Array.from({ length: Math.ceil(musicCount / pageSize) }, (_, i) => i + 1)"
                    class="relative z-10 border-y-[1px] inline-flex items-center  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    :class="pageNum == currentPage ? 'bg-indigo-600 text-white' : ''">
                    {{ pageNum }}</a>
                <a href="javascript:void(0)" @click="currentPage++; getPage()"
                    :class="currentPage == Math.ceil(musicCount / pageSize) ? 'pointer-events-none' : ''"
                    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                    <span class="sr-only">Next</span>
                    <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                </a>
            </nav>
        </div>
    </div>
</template>

<script setup>
import MusicGridList from './MusicGridList.vue';
import { get, post } from "@/axios/index.js";
import { ref } from 'vue';
import router from "@/router/index.js";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import { getCurrentInstance } from "vue";

const con = getCurrentInstance();
const staticPath = con.appContext.config.globalProperties.$staticPath;

const musics = ref([]);
const keyword = ref('')

const musicCount = ref(0);
const pageSize = 8;
const currentPage = ref(1);

get('/api/music/get-num', (message) => {
    console.log(message)
    musicCount.value = message
})

const getPage = () => {
    post(
        "/api/music/get-musicList-by-likeCount",
        {
            limit: pageSize,
            offset: (pageSize * (currentPage.value - 1))
        },
        (message) => {
            musics.value = []
            for (let i = 0; i < message.length; i++) {
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
}

getPage()

</script>

<style scoped></style>