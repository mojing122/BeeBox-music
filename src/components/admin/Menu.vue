<template>
    <div class="relative h-[100vh] border-r-2 border-gray-100">
        <div class="relative my-4 ml-4 flex items-center gap-x-4">
            <img src="/imageholder/40_40.png" alt="" class="h-10 w-10 rounded-full bg-gray-50" />
            <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                    <a>
                        <span class="absolute inset-0" />
                        {{ store.auth.user.username }}
                    </a>
                </p>
                <p class="text-gray-600"> {{ store.auth.user.email }}</p>
            </div>
        </div>
        <el-menu default-active="1" class="" active-text-color="#673AB7">
            <el-menu-item index="1" @click="router.push('/admin')">
                <el-icon><icon-menu /></el-icon>
                <span>管理歌单</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>歌曲管理</span>
                </template>
                <el-menu-item index="2-1" @click="router.push('/admin/musicManage')">曲库管理</el-menu-item>
                <el-menu-item index="2-2" @click="router.push('/admin/uploadMusic')">上传音乐</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3" @click="router.push('/admin/accountManage')">
                <el-icon>
                    <setting />
                </el-icon>
                <span>用户管理</span>
            </el-menu-item>
        </el-menu>
        <el-button class="absolute inset-x-0 bottom-0 m-10" @click="logout">登出</el-button>
    </div>
</template>

<script setup>
import { get, post } from "@/axios/index.js";
import { ElMessage } from "element-plus";
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'

import router from "@/router/index.js";

import { useStore } from "@/stores/index.js";

const store = useStore();

const logout = () => {
    get('/api/auth/logout', (message) => {
        ElMessage.success(message)
        store.auth.user = null
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        router.push('/')
    })
}
</script>

<style lang="scss" scoped></style>