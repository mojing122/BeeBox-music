<template>
    <div class="mx-auto max-w-7xl p-4 lg:px-8">
        <audio :src="state.file_url" id="music-player"></audio>
        <div
            class="bg-gray-100 border-slate-100 dark:bg-slate-700 dark:border-slate-500 border-b rounded-t-xl p-4 pb-2 space-y-6">
            <div class="flex items-center space-x-4">
                <img :src="state.cover" alt="" width="64" height="64" class="flex-none rounded-lg bg-slate-100"
                    loading="lazy" />
                <div class="min-w-0 flex-auto  font-semibold">
                    <p class="text-slate-900 dark:text-slate-50 text-lg">
                        {{ state.name }}
                    </p>
                    <div class="relative">
                        <h2 class="text-slate-500 dark:text-slate-400 text-sm  truncate">
                            {{ state.artist }}
                        </h2>
                        <div
                            class="absolute bottom-0 right-0 flex justify-between text-sm leading-6 font-medium tabular-nums">
                            <div class="text-cyan-500 dark:text-slate-100">{{ formatTooltip(state.currentTime) }}</div>
                            <p class="text-slate-500 dark:text-slate-400">/</p>
                            <div class="text-slate-500 dark:text-slate-400">{{ formatTooltip(state.length) }}</div>
                        </div>
                    </div>

                    <div class="relative">
                        <el-slider v-model="state.currentTime" :min=0 :max="state.length" :show-tooltip=false
                            :format-tooltip="formatTooltip" @change="changeTime()" />
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
            <div class="flex-auto flex items-center justify-evenly">
                <button type="button" aria-label="Add to favorites">
                    <svg width="24" height="24">
                        <path d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                            fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" class="" aria-label="Previous">
                    <svg width="24" height="24" fill="none">
                        <path d="m10 12 8-6v12l-8-6Z" fill="currentColor" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
                <button @click="rewind10Second()" type="button" class="hidden sm:block" aria-label="Rewind 10 seconds">
                    <svg width="24" height="24" fill="none">
                        <path
                            d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 5v3.111c0 .491.398.889.889.889H9" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
            <button v-if=!state.palying type="button" @click="play()"
                class="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                aria-label="Play">
                <svg t="1704881939243" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4339" width="64" height="64">
                    <path
                        d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                        fill="currentColor" p-id="4341"></path>
                </svg>
            </button>
            <button v-if=state.palying type="button" @click="pause()"
                class="bg-white text-slate-900 dark:bg-slate-100 dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
                aria-label="Pause">
                <svg width="30" height="32" fill="currentColor">
                    <rect x="6" y="4" width="4" height="24" rx="2" />
                    <rect x="20" y="4" width="4" height="24" rx="2" />
                </svg>
            </button>
            <div class="flex-auto flex items-center justify-evenly">
                <button @click="skip10Second()" class="hidden sm:block" type="button" aria-label="Skip 10 seconds">
                    <svg width="24" height="24" fill="none">
                        <path
                            d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" class="" aria-label="Next">
                    <svg width="24" height="24" fill="none">
                        <path d="M14 12 6 6v12l8-6Z" fill="currentColor" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
                <button type="button" class="" @click="like()">
                    <svg v-if="state.isLiked" t="1704882599978" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6184" width="24" height="24">
                        <path
                            d="M32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512L562.592 892.8a96 96 0 0 1-124.416-1.952l-308.16-270.688A278.976 278.976 0 0 1 32 407.584z"
                            fill="currentColor" p-id="6185"></path>
                    </svg>
                    <svg v-if="!state.isLiked" t="1704882684858" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="6357" width="24" height="24">
                        <path
                            d="M171.712 571.648l0.352 0.32 287.904 252.8a64 64 0 0 0 82.912 1.344l296.832-244.544a215.584 215.584 0 1 0-301.824-300.576L512 316.672l-25.888-35.616a215.584 215.584 0 1 0-314.4 290.624zM32 407.584a279.584 279.584 0 0 1 480-194.944 279.584 279.584 0 0 1 480 194.944 278.144 278.144 0 0 1-113.024 224.512l-295.36 243.392a128 128 0 0 1-165.888-2.592L129.984 620.16A278.976 278.976 0 0 1 32 407.584z"
                            fill="currentColor" p-id="6358"></path>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Howl, Howler } from 'howler';

const state = ref({
    name: 'One Last Kiss',
    artist: '宇多田ヒカル',
    cover: 'https://imgcache.dealmoon.com/thumbimg.dealmoon.com/dealmoon/b47/c7f/76a/452b155eeb7f78558fb6620.jpg_0_0_1_8991.jpg',
    file_url: 'http://music.163.com/song/media/outer/url?id=1950674547.mp3',
    currentTime: 0,
    length: 0,
    palying: false,
    isLiked: true
})


/**
 * 播放
 */
const play = () => {
    const audio = document.querySelector('#music-player') as HTMLMediaElement;
    state.value.palying = true;
    audio.play();
}

/**
 * 暂停
 */
const pause = () => {
    const audio = document.querySelector('#music-player') as HTMLMediaElement;
    state.value.palying = false;
    audio.pause();
}

/**
 * 进度条拖动
 */
const changeTime = () => {
    const audio = document.querySelector('#music-player') as HTMLMediaElement;
    audio.currentTime = state.value.currentTime;
}

/**
 * 点赞/取消点赞
 */
const like = () => {
    state.value.isLiked = !state.value.isLiked;
}

const skip10Second = () => {
    const audio = document.querySelector('#music-player') as HTMLMediaElement;
    state.value.currentTime = audio.currentTime + 10;
    if (state.value.currentTime > state.value.length) { state.value.currentTime = state.value.length; }
    audio.currentTime = state.value.currentTime;
}

const rewind10Second = () => {
    const audio = document.querySelector('#music-player') as HTMLMediaElement;
    state.value.currentTime = audio.currentTime - 10;
    if (state.value.currentTime < 0) { state.value.currentTime = 0; }
    audio.currentTime = state.value.currentTime;
}

const currentTime = ref(0)

const formatTooltip = (seconds: number) => {

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.ceil(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}



onMounted(() => {

    const audio = document.querySelector('#music-player') as HTMLMediaElement;

    if (audio) { // 检查audio是否为null 
        audio.addEventListener("loadedmetadata", function () {
            state.value.length = audio.duration; // 设置进度条
        });
        audio.addEventListener('play', () => {
            state.value.palying = true;
        });
        audio.addEventListener('pause', () => {
            state.value.palying = false;
        });

        setInterval(() => {
            state.value.currentTime = audio.currentTime
        }, 1000);
    } else {
        console.error('播放器不存在');
    }
})

</script>

<style scoped></style>