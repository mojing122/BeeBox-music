<template>
  <div style="text-align: center; margin-top: 30vh">
    <div style="margin: 10px; font-size: 20px">
      登录成功
    </div>
    <div style="margin-top: 10px">
      <el-button @click="logout" type="danger">退出登录</el-button>
    </div>
  </div>
</template>

<script setup>
import {get} from "@/http";
import {ElMessage} from "element-plus";
import router from "@/router/index.js";
import {useStore} from "@/stores/index.js";

const store = useStore();
const logout = () => {
  get('/api/auth/logout', (message) => {
    ElMessage.success(message)
    store.auth.user = null
    router.push('/')
  })
}
</script>


<style scoped>

</style>