<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-slate-900 dark:text-white">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-24 w-auto hidden dark:block" src="@/assets/img/welcome/logo-white.png" alt="MoMusic Logo" />
      <img class="mx-auto h-24 w-auto dark:hidden" src="@/assets/img/welcome/logo-black.png" alt="MoMusic Logo" />
      <h2 class="mt-10 text-center text-3xl font-bold leading-9 tracking-tight">
        新用户注册
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <el-form class="space-y-4" :model="registerForm" :rules="rules" @validate="onValidate" ref="formRef">
        <el-form-item prop="username">
          <el-input v-model="registerForm.username" :maxlength="10" type="text" placeholder="用户名">
            <template #prefix>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" type="password" show-password :maxlength="16" placeholder="请设置密码">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password_repeat">
          <el-input v-model="registerForm.password_repeat" type="password" show-password :maxlength="16"
            placeholder="重复密码">
            <template #prefix>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerForm.email" type="email" placeholder="邮箱地址">
            <template #prefix>
              <el-icon>
                <Message />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="registerForm.code" :maxlength="6" placeholder="验证码" type="text">
            <template #append>
              <el-button @click="validateEmail" style="font-size: 10px" size="small"
                :disabled="!isEmailValid || coldTime > 0" class="get-code-button">
                {{ coldTime > 0 ? coldTime + "秒后重试" : "获取验证码" }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="pt-6">
          <button @click="register" type="button"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-3 text-base font-semibold leading-6 text-black shadow-sm hover:bg-primary_d focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
            立即注册
          </button>
        </div>
      </el-form>

      <p class="mt-10 text-center text-sm text-gray-500 dark:text-gray-100">
        已有账号?
        {{ " " }}
        <a @click="router.push('/')"
          class="font-semibold leading-6 text-primary_coml hover:text-primary_comd dark:text-indigo-300 dark:hover:text-indigo-200">返回登录</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { post } from "@/axios";
import router from "@/router/index.js";
import { ref } from "vue";

const registerForm = ref({
  username: "",
  password: "",
  password_repeat: "",
  email: "",
  code: "",
});

const formRef = ref();
const isEmailValid = ref(false);
const coldTime = ref(0);
/**
 * 注册方法
 */
const register = () => {
  formRef.value.validate((isValid) => {
    if (isValid) {
      post(
        "api/auth/register",
        {
          username: registerForm.value.username,
          password: registerForm.value.password,
          email: registerForm.value.email,
          code: registerForm.value.code,
        },
        (message) => {
          ElMessage.success(message);
          router.push("/");
        }
      );
    } else {
      ElMessage.warning("请完整填写信息");
    }
  });
};

/**
 * 发送邮件验证码
 */
const validateEmail = () => {
  coldTime.value = 60;
  post(
    "/api/auth/valid-register-email",
    {
      email: registerForm.value.email,
    },
    (message) => {
      ElMessage.success(message);
      setInterval(() => coldTime.value--, 1000);
    },
    "application/x-www-form-urlencoded",
    (message) => {
      ElMessage.warning(message);
      coldTime.value = 0;
    },
    (message) => {
      ElMessage.error("未知错误，请联系管理员");
      coldTime.value = 0;
    }
  );
};

/**
 * 用户名验证规则
 */
const validateUsername = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!/^[\u4e00-\u9fa5a-zA-Z0-9]+$/.test(value)) {
    callback(new Error("用户名不能包含特殊字符"));
  } else {
    callback();
  }
};

/**
 * 确认密码验证规则
 */
const validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== registerForm.value.password) {
    callback(new Error("两次输入的密码不一致!"));
  } else {
    callback();
  }
};

/**
 * 所有验证规则
 */
const rules = {
  username: [
    { validator: validateUsername, trigger: ["blur", "change"] },
    { min: 2, max: 10, message: "长度在2-10之间", trigger: ["blur", "change"] },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 16, message: "长度在6-16之间", trigger: ["blur", "change"] },
  ],
  password_repeat: [
    { validator: validatePassword, trigger: ["blur", "change"] },
  ],
  email: [
    { required: true, message: "请输入邮件地址", trigger: "blur" },
    {
      type: "email",
      message: "请输入正确的邮件地址",
      trigger: ["blur", "change"],
    },
  ],
  code: [{ required: true, message: "请输入获取的验证码", trigger: "blur" }],
};

/**
 * 判断邮箱地址是否合规并允许发送验证邮件
 */
const onValidate = (prop, isValid) => {
  if (prop === "email") isEmailValid.value = isValid;
};
</script>

<style lang="scss" scoped></style>
