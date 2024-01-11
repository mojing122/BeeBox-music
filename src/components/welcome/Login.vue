<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-slate-900 dark:text-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-24 w-auto hidden dark:block" src="@/assets/img/welcome/logo-white.png"
        alt="BeeBoxMusic Logo" />
      <img class="mx-auto h-24 w-auto dark:hidden" src="@/assets/img/welcome/logo-black.png" alt="BeeBoxMusic Logo" />
      <h2 class="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">
        登录 BeeBox
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <el-form class="space-y-6" :model="loginForm" :rules="rules" ref="formRef">
        <el-form-item prop="email">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">邮箱</label>
          <el-input v-model="loginForm.email" type="email" placeholder="邮箱地址" class="mt-2" size="large">
            <template #prefix>
              <el-icon>
                <Message />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <div class="flex items-center justify-between w-full mt-[-10px]">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">密码</label>
            <div class="text-sm">
              <a @click="router.push('/forget')"
                class="font-semibold text-primary_coml hover:text-primary_comd dark:text-indigo-300 dark:hover:text-indigo-200 float-left">忘记密码?</a>
            </div>
          </div>
          <el-input v-model="loginForm.password" type="password" show-password :maxlength="16" placeholder="密码"
            class="mt-2" size="large">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <div class="pt-6">
          <button @click="login" type="button"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-3 text-base font-semibold leading-6 text-black shadow-sm hover:bg-primary_d focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            登录
          </button>
        </div>
      </el-form>

      <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-100">
        没有账号?
        {{ " " }}
        <a @click="router.push('/register')"
          class="font-semibold leading-6 text-primary_coml hover:text-primary_comd dark:text-indigo-300 dark:hover:text-indigo-200">立即注册</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { get, post } from "@/axios/index.js";
import router from "@/router/index.js";
import { useStore } from "@/stores/index.js";

const store = useStore();
const formRef = ref();

const loginForm = ref({
  email: "",
  password: "",
  remember: true,
});

const login = () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    ElMessage.warning("请填写用户名密码");
  } else {
    post(
      "/api/auth/login",
      {
        username: loginForm.value.email,
        password: loginForm.value.password,
        remember: loginForm.value.remember,
      },
      (message) => {
        ElMessage.success(message);
        get(
          "/api/user/get-user-info",
          (message) => {
            store.auth.user = message;
            router.push("/index");
          },
          () => {
            store.auth.user = null;
          }
        );
      }
    );
  }
};

const rules = {
  email: [
    { required: true, message: "请输入邮件地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮件地址",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "长度在6-16之间", trigger: ["blur", "change"] },
  ],
};
</script>

<style lang="scss" scoped></style>
