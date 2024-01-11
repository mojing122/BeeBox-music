<template>
    <div>
        <el-form :model="form" label-width="120px">
            <el-form-item label="音乐名">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="艺术家">
                <el-input v-model="form.artist" />
            </el-form-item>
            <el-form-item label="歌曲文件">
                <label v-if="!MusicDisplay" for="MusicInput" @drop.prevent="onDrop" @dragover.prevent=""
                    class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[200px] h-[60px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div class="mt-1 text-[13px]">选择上传歌曲文件</div>
                    <div class="mt-0 text-gray-400 text-sm">MP3格式，小于10MB</div>
                    <input ref="MusicFile" type="file" id="MusicInput" @input="onMusicChange" hidden accept=".mp3" />
                </label>
                <div v-else
                    class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[400px] h-[80px] p-3 rounded-2xl cursor-pointer relative">
                    <div class="h-full w-full"></div>
                    <audio id="music-preview" controls class=" absolute rounded-xl object-cover z-10 p-[13px] w-full h-full"
                        :src="MusicDisplay" />
                    <div
                        class="absolute -bottom-12 -m-2 flex items-center justify-between z-50 rounded-xl border w-[180px] p-2 border-gray-300 md:left-4">
                        <button @click="clearMusic()" class="text-[12px] ml-2 font-semibold w-full">
                            更换音频
                        </button>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="歌曲封面">
                <label v-if="!ImgDisplay" for="CoverInput" @drop.prevent="onDrop" @dragover.prevent=""
                    class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[200px] h-[200px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div class="mt-4 text-[13px]">选择上传封面图片</div>
                    <div class="mt-2 text-gray-400 text-sm">JPG格式</div>
                    <div class="mt-2 text-gray-400 text-sm">文件小于5MB</div>
                    <input ref="CoverFile" type="file" id="CoverInput" @input="onImgChange" hidden accept=".jpg" />
                </label>
                <div v-else
                    class="md:mx-0 mx-auto mt-4 md:mb-12 mb-16 flex items-center justify-center w-full max-w-[200px] h-[200px] p-3 rounded-2xl cursor-pointer relative">
                    <div class="h-full w-full bg-slate-200"></div>
                    <img class=" absolute rounded-xl object-cover z-10 p-[13px] w-full h-full" :src="ImgDisplay" />
                    <div
                        class="absolute -bottom-12 -m-2 flex items-center justify-between z-50 rounded-xl border w-[90%] p-2 border-gray-300">
                        <button @click="clearImg()" class="text-[12px] ml-2 font-semibold w-full">
                            更换封面
                        </button>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <el-button class="ml-3" type="success" @click="createMusic">
            保存并上传
        </el-button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { get, post } from "@/axios/index.js";


const MusicFile = ref(null)
const CoverFile = ref(null)
const MusicFileData = ref(null)
const CoverFileData = ref(null)
const MusicDisplay = ref(null)
const ImgDisplay = ref(null)

const form = ref({
    name: '',
    artist: '',
})


const onImgChange = () => {
    ImgDisplay.value = URL.createObjectURL(CoverFile.value.files[0]);
    CoverFileData.value = CoverFile.value.files[0];
};

const onMusicChange = () => {
    MusicDisplay.value = URL.createObjectURL(MusicFile.value.files[0]);
    MusicFileData.value = MusicFile.value.files[0];
};

const createMusic = async () => {
    if (form.value.name == '' || form.value.artist == '' || MusicFileData.value == null || CoverFileData.value == null) {
        ElMessage.warning("请检查信息是否填写完整");
        return;
    }
    let data = new FormData();
    data.append("name", form.value.name);
    data.append("artist", form.value.artist);
    data.append("file", MusicFileData.value || '');
    data.append("cover", CoverFileData.value || '');
    const audio = document.querySelector('#music-preview');
    data.append("length", Math.ceil(audio.duration));

    if (MusicFile.value && CoverFile.value) {
        //上传
    }

    // 发送POST请求上传文件  
    post(
        "/api/admin/creat-music",
        data,
        (message) => {
            ElMessage.success(message);
        },
        "multipart/form-data"
    )

};

const clearImg = () => {
    CoverFile.value = null;
    ImgDisplay.value = null;
};

const clearMusic = () => {
    MusicFile.value = null;
    MusicDisplay.value = null;
};

</script>

<style scoped></style>

<style></style>