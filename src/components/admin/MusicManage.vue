<template>
    <div class="w-[80vw]">
        <div class="text-4xl font-extrabold  mt-2 pb-2 border-b-[1px] ">曲库管理</div>
        <el-table :data="tableData" style="width: 100%" height="600">
            <el-table-column fixed prop="id" label="ID" width="60" />
            <el-table-column prop="name" label="歌曲" width="120" />
            <el-table-column prop="length" label="长度(s)" width="80" />
            <el-table-column prop="artist" label="艺人" width="100" />
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click="handleClickDelete(scope.row.id)">删除</el-button>
                    <el-button link type="primary" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { get, post } from "@/axios/index.js";
import { ElMessage } from 'element-plus';

const handleClickDelete = (id) => {
    post("/api/admin/delete-music", {
        musicId: id
    }, (message) => {
        ElMessage.success('删除成功');
        let newData = tableData.value.filter(obj => obj.id !== id);
        tableData.value = newData;
    })
}

const tableData = ref([])


post(
    "/api/music/get-musicList-by-likeCount",
    {
        limit: 100,
        offset: 0
    },
    (message) => {
        tableData.value = message;
    }


);
</script>

<style lang="scss" scoped></style>