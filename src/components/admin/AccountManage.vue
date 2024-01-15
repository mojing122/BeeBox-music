<template>
    <div class="w-[80vw]">
        <div class="text-4xl font-extrabold  mt-2 pb-2 border-b-[1px] ">账号管理</div>
        <el-table :data="tableData" style="width: 100%" height="600">
            <el-table-column fixed prop="id" label="ID" width="60" />
            <el-table-column prop="username" label="用户名" width="160" />
            <el-table-column prop="email" label="邮箱" width="180" />
            <el-table-column prop="accountrole" label="权限" width="100" />
            <el-table-column fixed="right" label="管理员权限" width="160">
                <template #default="scope">
                    <el-button v-if="scope.row.accountrole == 'admin'" @click="resetRole(scope.row.id, 'user')"
                        type="primary" plain size="small">取消管理员</el-button>
                    <el-button v-else @click="resetRole(scope.row.id, 'admin')" type="danger" size="small">设为管理员</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { get, post } from "@/axios/index.js";
import { ElMessage } from 'element-plus';

const resetRole = (id, role) => {
    post("/api/admin/reset-account-role", {
        id: id,
        role: role
    }, (message) => {
        ElMessage.success('修改成功');
        setTimeout(() => {
            location.reload();
        }, 500);

    })
}

const tableData = ref([])

get(
    "/api/admin/get-user-list",
    (message) => {
        tableData.value = message;
    }


);
</script>

<style lang="scss" scoped></style>