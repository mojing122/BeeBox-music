import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import ElementPlus from "element-plus";
import "./assets/style/element.scss";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

import axios from "axios";

const api = "http://localhost:8080";
//const api = "https://music.mojing.live";

axios.defaults.baseURL = api;
axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(router);

app.config.globalProperties.$staticPath = api;

// 配置Pinia持久化
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount("#app");
