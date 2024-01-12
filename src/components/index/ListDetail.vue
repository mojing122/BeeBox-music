<template>
    <div>
        <div class="max-w-7xl lg:mx-auto text-gray-800 dark:text-gray-200 mx-10">

            <div class="flex mt-8">
                <div class="flex-shrink-0">
                    <img :src="ListRef.cover" class="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32" />
                </div>

                <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                    <div class="mt-4 flex flex-1 justify-between">
                        <div>
                            <div class="flex justify-between">
                                <h4 class="text-2xl">
                                    <p class="font-medium">{{
                                        ListRef.name
                                    }}</p>
                                </h4>
                            </div>
                            <p class="mt-1  text-gray-500">{{ ListRef.listlength }}首音乐</p>
                        </div>
                        <div class="ml-4" v-if="!ListRef.editable">
                            <button type="button" @click="favourite()" class="text-lg px-8 py-4 rounded-md font-bold"
                                :class="ListRef.isFavourite ? ' bg-red-400 text-white' : 'bg-primary text-indigo-400'">
                                <p v-if="!ListRef.isFavourite">收藏歌单</p>
                                <p v-else>取消收藏</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4 text-lg">
                <p class="font-bold inline-block">详情：</p>{{ ListRef.description }}
            </div>


            <MusicList :musics="ListRef.music_list" :editable=ListRef.editable />
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import formatTimeTool from "@/tools/timeTools.js"
import MusicList from '@/components/index/MusicList.vue'
import { get, post } from "@/axios/index.js";
const staticPath = 'http://localhost:8080'

const listId = router.currentRoute.value.query['id'];


const ListRef = ref({
    name: '推荐歌单',
    description: '编辑精选推荐',
    listlength: 3,
    cover: '/imageholder/96*96.png',
    isFavourite: true,
    editable: false,
    music_list: [{
        music_id: 1,
        name: ' 青花瓷',
        artist: '周杰伦',
        length: formatTimeTool(341),
        is_liked: true
    }, {
        music_id: 2,
        name: '稻香',
        artist: '周杰伦',
        length: formatTimeTool(221),
        is_liked: false
    }, {
        music_id: 3,
        name: ' 告白气球',
        artist: '周杰伦',
        length: formatTimeTool(316),
        is_liked: true
    }]
})

const favourite = () => {
    ListRef.value.isFavourite = !ListRef.value.isFavourite;
}

post(
    "/api/playlist/get-music-by-playlistid",
    {
        playlistId: listId
    },
    (message) => {
        console.log(message)
        ListRef.value.name = message.name;
        ListRef.value.cover = staticPath + message.cover;
        ListRef.value.description = message.description;
        ListRef.value.listlength = message.musicList.length;
        ListRef.value.isFavourite = (message.isLiked > 0) ? true : false;
        ListRef.value.editable = message.editable;


    }
);



</script>
<style scoped></style>