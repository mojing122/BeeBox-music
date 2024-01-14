<template>
    <div>
        <div class="max-w-7xl lg:mx-auto text-gray-800 dark:text-gray-200 mx-10">

            <div class="text-4xl font-extrabold ml-8 mt-10 pb-2 border-b-[1px] ">『{{ keyword }}』搜索结果</div>


            <MusicList :musics="ListRef" :editable=false />
        </div>
    </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import formatTimeTool from "@/tools/timeTools.js"
import MusicList from '@/components/index/MusicList.vue'
import { get, post } from "@/axios/index.js";
import { ElMessage } from "element-plus";
const staticPath = 'http://localhost:8080'

const keyword = router.currentRoute.value.query['keyword'];


const ListRef = ref([])

get(
    "/api/music/get-music-by-name?musicName=" + keyword,
    (message) => {
        console.log(message)
        for (let music of message) {
            let line = {};
            line.music_id = music.id;
            line.name = music.name;
            line.artist = music.artist;
            line.length = formatTimeTool(music.length);
            line.is_liked = music.isLiked;
            line.file_url = staticPath + music.fileUrl;
            line.cover = staticPath + music.cover;
            ListRef.value.push(line)
        }

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

    post('/api/playlist/delete-playlist', {
        playlistId: ListRef.value.id
    }, (message) => {
        ElMessage.success('删除成功');
        router.back();
    })

}



</script>
<style scoped></style>