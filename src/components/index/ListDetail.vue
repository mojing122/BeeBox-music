<template>
    <div>
        <div class="max-w-7xl lg:mx-auto text-gray-800 dark:text-gray-200 mx-10">

            <div class="flex mt-8">
                <div class="flex-shrink-0">
                    <img :src="ListRef.cover" class="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32" />
                </div>

                <div class="ml-4 flex flex-1 flex-col sm:ml-6 relative">
                    <div class="mt-4 flex flex-1 justify-between">
                        <div class="hidden sm:block">
                            <div class="flex justify-between">
                                <h4 class="text-2xl">
                                    <p class="font-medium">{{
                                        ListRef.name
                                    }}</p>
                                </h4>
                            </div>
                            <p class="mt-1  text-gray-500">{{ ListRef.listlength }}首音乐</p>
                        </div>
                        <p class="text-gray-500 text-sm absolute bottom-2 sm:hidden">{{ ListRef.listlength }}首音乐</p>
                        <div v-if="isLoaded" class="absolute right-0">
                            <div class="ml-4" v-if="!ListRef.editable">
                                <button type="button" @click="favourite()" class="px-2 py-4 w-[80px] rounded-md font-bold"
                                    :class="ListRef.isFavourite ? ' bg-red-400 text-white' : 'bg-primary text-indigo-400'">
                                    <p v-if="!ListRef.isFavourite">收藏歌单</p>
                                    <p v-else>取消收藏</p>
                                </button>
                            </div>
                            <div class="ml-4" v-else>
                                <button type="button" @click="deleteList()"
                                    class="px-2 py-4 w-[80px] rounded-md font-bold  bg-red-600 text-white">
                                    <p>删除歌单</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <div class="block sm:hidden">
                    <div class="justify-between mb-2">
                        <h4 class="text-xl inline-block">
                            <p class="font-medium">{{
                                ListRef.name
                            }}</p>
                        </h4>
                    </div>
                </div>
                <div class="text-sm">
                    <p class="font-bold inline-block">详情：</p>{{ ListRef.description }}
                </div>
            </div>


            <MusicList :musics="ListRef.music_list" :editable=ListRef.editable @update:musics="updateMusics" />
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import { ref, getCurrentInstance } from "vue";
import formatTimeTool from "@/tools/timeTools.js"
import MusicList from '@/components/index/MusicList.vue'
import { get, post } from "@/axios/index.js";
import { ElMessage, ElMessageBox } from "element-plus";

const con = getCurrentInstance();
const staticPath = con.appContext.config.globalProperties.$staticPath;

const listId = router.currentRoute.value.query['id'];
const isLoaded = ref(false)

const ListRef = ref({
    id: listId,
    name: '推荐歌单',
    description: '编辑精选推荐',
    listlength: 3,
    cover: '/imageholder/96_96.png',
    isFavourite: true,
    editable: false,
    music_list: []
})

post(
    "/api/playlist/get-music-by-playlistid",
    {
        playlistId: listId
    },
    (message) => {
        ListRef.value.name = message.name;
        ListRef.value.cover = staticPath + message.cover;
        ListRef.value.description = message.description;
        ListRef.value.listlength = message.musicList.length;
        ListRef.value.isFavourite = (message.isLiked > 0) ? true : false;
        ListRef.value.editable = message.editable;
        for (let music of message.musicList) {
            let line = {};
            line.music_id = music.id;
            line.name = music.name;
            line.artist = music.artist;
            line.length = formatTimeTool(music.length);
            line.is_liked = music.isLiked;
            line.file_url = staticPath + music.fileUrl;
            line.cover = staticPath + music.cover;
            ListRef.value.music_list.push(line)
        }
        isLoaded.value = true;

    }
);

const favourite = () => {

    post('/api/playlist/like-or-cancel-like-musicsheet',
        {
            playlistId: ListRef.value.id,
            flag: !ListRef.value.isFavourite
        },
        (message) => {
            ListRef.value.isFavourite = !ListRef.value.isFavourite;
        })

}

const deleteList = () => {

    ElMessageBox.confirm(
        '确认要删除歌单吗，此动作不可逆?',
        '警告',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            post('/api/playlist/delete-playlist', {
                playlistId: ListRef.value.id
            }, (message) => {
                ElMessage.success('删除成功');
                router.back();
            })
        })
        .catch(() => {

        })



}

const updateMusics = (newMusics) => {
    console.log(newMusics)
    //this.musics = newMusics; // 更新 musics 的值  
}


</script>
<style scoped></style>