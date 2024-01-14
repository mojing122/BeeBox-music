<template>
    <div class="w-[80vw]">
        <div class="text-4xl font-extrabold  mt-2 pb-2 border-b-[1px] ">歌单管理</div>
        <el-table :data="tableData" style="width: 100%" height="600">
            <el-table-column fixed prop="id" label="ID" width="60" />
            <el-table-column prop="name" label="歌单名" width="120" />
            <el-table-column prop="description" label="描述" width="160" />
            <el-table-column prop="creatorid" label="创建者(ID)" width="60" />
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />
            <el-table-column fixed="right" label="Operations" width="140">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click="handleClickDelete(scope.row.id)">删除</el-button>
                    <el-button link type="primary" size="small">编辑</el-button>
                    <el-button link type="primary" size="small"><a :href="'/listDetail?id=' + scope.row.id"
                            target="_blank">查看</a></el-button>
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
    post("/api/admin/delete-playlist", {
        playlistId: id
    }, (message) => {
        ElMessage.success('删除成功');
        let newData = tableData.value.filter(obj => obj.id !== id);
        tableData.value = newData;
    })
}

const handleClick = () => {
    console.log('click')
}

const tableData = ref([])

get(
    "/api/playlist/get-playlist?limit=100&offset=0",
    (message) => {
        tableData.value = message;
    }

);
</script>

<style lang="scss" scoped></style>