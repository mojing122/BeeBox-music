<template>
    <div>
        <div class="max-w-7xl mx-auto text-gray-800 dark:text-gray-200">
            <div class="flex mx-[20px] items-baseline justify-between pt-16 pb-6">
                <h1 class="text-4xl font-bold tracking-tight">我创建的歌单</h1>
                <div class="flex items-center">
                    <button @click="dialogFormVisible = true" type="button" class="text-gray-600 dark:text-gray-400">
                        <span
                            class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">新建歌单</span>
                    </button>
                </div>
            </div>

            <div>
                <GridList :List="playLists" />
            </div>
        </div>
    </div>
    <el-dialog v-model="dialogFormVisible" title="新建歌单" class="dark:bg-gray-100">
        <el-form :model="form" label-width="60px">
            <el-form-item label="歌单名">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.description" type="textarea" />
            </el-form-item>
            <el-form-item label="封面">
                <label v-if="!ImgDisplay" for="CoverInput" @drop.prevent="onDrop" @dragover.prevent=""
                    class="md:mx-0 mx-auto mt-4 mb-6 flex flex-col items-center justify-center w-full max-w-[200px] h-[200px] text-center p-3 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div class="mt-4 text-[13px]">选择上传封面图片</div>
                    <div class="mt-2 text-gray-400 text-sm">JPG/PNG格式</div>
                    <div class="mt-2 text-gray-400 text-sm">文件小于5MB</div>
                    <input ref="CoverFile" type="file" id="CoverInput" @input="onImgChange" hidden accept=".jpg,.png" />
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
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="success" @click="dialogFormVisible = false; createMusic()">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import GridList from '@/components/index/GridList.vue';
import { get, post } from "@/axios/index.js";
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getCurrentInstance } from "vue";

const con = getCurrentInstance();
const staticPath = con.appContext.config.globalProperties.$staticPath;

const dialogFormVisible = ref(false)
const CoverFile = ref(null)
const CoverFileData = ref(null)
const ImgDisplay = ref(null)

const form = ref({
    name: '',
    description: '',
})


const playLists = ref([
])

get(
    "/api/playlist/show-the-playlist-I-created",
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

const onImgChange = () => {
    ImgDisplay.value = URL.createObjectURL(CoverFile.value.files[0]);
    CoverFileData.value = CoverFile.value.files[0];
};

const createMusic = async () => {
    if (form.value.name == '' || form.value.description == '' || CoverFileData.value == null) {
        ElMessage.warning("请检查信息是否填写完整");
        return;
    }
    let data = new FormData();
    data.append("name", form.value.name);
    data.append("description", form.value.description);
    data.append("cover", CoverFileData.value || '');

    // 发送POST请求上传文件  
    post(
        "/api/playlist/insert-playlist",
        data,
        (message) => {
            ElMessage.success('创建成功');
            post('/api/playlist/like-or-cancel-like-musicsheet',
                {
                    playlistId: message,
                    flag: true
                },
                (message) => {
                    ListRef.value.isFavourite = !ListRef.value.isFavourite;
                })
            form.value.name = '';
            form.value.description = '';
            clearImg();
            location.reload();
        },
        "multipart/form-data"
    )

};

const clearImg = () => {
    CoverFile.value = null;
    ImgDisplay.value = null;
};

</script>

<style lang="scss" scoped></style>