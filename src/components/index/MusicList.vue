<template>
    <div class="px-0 sm:px-4 lg:px-6 mx-4">
        <div class="-mx-4 mt-8 sm:-mx-0">
            <table class="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        <th scope="col" class="py-3.5 pr-3 text-left text-sm font-semibold">歌曲
                        </th>
                        <th scope="col" class=" px-3 py-3.5 text-left text-sm font-semibold ">艺人
                        </th>
                        <th scope="col" class="hidden sm:table-cell px-3 py-3.5 text-right text-sm font-semibold">时间
                        </th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                            <span class="sr-only">更多操作</span>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="music in  musics " :key="music.music_id">
                        <td @click="PlayMusic(music)" class="py-4 pr-3 text-sm font-medium sm:w-auto sm:max-w-none ">
                            {{ music.name }}
                        </td>
                        <td class="px-3 py-4 text-sm text-gray-500 ">{{ music.artist }}</td>
                        <td class="hidden sm:table-cell px-3 py-4 text-sm text-right text-gray-500 ">{{ music.length }}</td>
                        <td class="flex py-4 pl-3 pr-4 float-right text-right text-sm font-medium sm:pr-0">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900" @click="like(music)">
                                <HeartIcon v-if="!music.is_liked" class="h-6 w-6" />
                                <HeartIconSolid v-else class="h-6 w-6" />
                            </a>
                            <a href="#" class="text-indigo-600 hover:text-indigo-900 px-4">
                                <Menu as="div" class="relative inline-block text-left">
                                    <div>
                                        <MenuButton>
                                            <EllipsisHorizontalCircleIcon class="h-6 w-6" aria-hidden="true" />
                                        </MenuButton>
                                    </div>

                                    <transition enter-active-class="transition ease-out duration-100"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-75"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95">
                                        <MenuItems
                                            class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div class="py-1">
                                                <MenuItem v-slot="{ active }" v-if="editable"
                                                    @click="deleteFromList(music)">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-red-400' : 'text-red-500', 'block px-4 py-2 text-sm']">
                                                    从歌单删除</a>
                                                </MenuItem>
                                                <MenuItem v-slot="{ active }">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                    查看歌曲详情</a>
                                                </MenuItem>
                                                <MenuItem v-slot="{ active }"
                                                    @click="dialogFormVisible = true; MusicChoice = music.music_id">
                                                <a href="#"
                                                    :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                                                    添加到我的歌单</a>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </transition>
                                </Menu>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <el-dialog v-model="dialogFormVisible" title="加入歌单" class="dark:bg-gray-100" width="60%">
            <el-radio-group v-for="list in lists" v-model="listChoice" text-color="#409EFF" class="ml-2 flex flex-col">
                <el-radio :label="list.id" size="large" class="ml-2">
                    <p class="w-[35vw] sm:w-[45vw] truncate">{{ list.name }}</p>
                </el-radio>
            </el-radio-group>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="success" @click="dialogFormVisible = false; addToList(listChoice)">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
  
<script setup>


defineProps(['musics', 'editable'])

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

import {
    HeartIcon,
    EllipsisHorizontalCircleIcon
} from "@heroicons/vue/24/outline";

import {
    HeartIcon as HeartIconSolid,
} from "@heroicons/vue/24/solid";
import { useStore } from "@/stores/index.js";
import { get, post } from "@/axios/index.js";
import router from '@/router/index.js'
import { onMounted } from 'vue';

import { ref, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus'

const store = useStore();

const dialogFormVisible = ref(false)
const listChoice = ref(1)
const MusicChoice = ref(0);

const lists = ref([])
get(
    "/api/playlist/show-the-playlist-I-created",
    (message) => {
        for (let i = 0; i < message.length; i++) {
            let item = { id: 0, name: '' }
            item.id = message[i].id;
            item.name = message[i].name;
            lists.value.push(item)
        }
    }

);

const PlayMusic = (item) => {
    store.currentPaly.id = item.music_id;
    store.currentPaly.name = item.name;
    store.currentPaly.artist = item.artist;
    store.currentPaly.cover = item.cover;
    store.currentPaly.file_url = item.file_url;
    store.currentPaly.isLiked = item.is_liked;
}

/**
 * 点赞/取消点赞
 */
const like = (music) => {
    post('/api/music/like-or-cancel-like-music',
        {
            musicId: music.music_id,
            flag: !music.is_liked
        },
        (message) => {
            music.is_liked = !music.is_liked;
        })

}


/**
 * 加入歌单
 */
const addToList = (listId) => {
    post('/api/playlist/add-music-to-list',
        {
            musicId: MusicChoice.value,
            playlistId: listId,
            flag: true
        },
        (message) => {
            ElMessage.success('成功添加到歌单')
        })

}

const props = getCurrentInstance().props;

/**
     * 从歌单中删除
     */
const deleteFromList = (music) => {
    const listId = router.currentRoute.value.query['id'];
    post('/api/playlist/add-music-to-list',
        {
            musicId: music.music_id,
            playlistId: listId,
            flag: false
        },
        (message) => {
            location.reload();
        })

}

onMounted(() => {



})


</script>