import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";
import { useStore } from "@/stores/index.js";

const store = useStore();

axios.defaults.withCredentials = true;

const defaultError = () => ElMessage.error("发生了一些错误，请联系管理员");
const defaultFailure = (message) => ElMessage.warning(message);

/**
 * 封装axios Post方法
 * @param url 请求地址
 * @param data body数据
 * @param success 成功回调
 * @param failure 失败回调
 * @param error 错误回调
 */
function post(
  url,
  data,
  success,
  contentType = "application/x-www-form-urlencoded",
  failure = defaultFailure,
  error = defaultError
) {
  axios
    .post(url, data, {
      headers: {
        "Content-Type": contentType,
      },
      withCredentials: true,
    })
    .then(({ data }) => {
      if (data.success) success(data.message, data.status);
      else if (data.status === 411) {
        store.auth.user = null;
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
        router.push("/");
      } else failure(data.message, data.status);
    })
    .catch(error);
}

/**
 * 封装axios Get方法
 * @param url 请求地址
 * @param success 成功回调
 * @param failure 失败回调
 * @param error 错误回调
 */
function get(url, success, failure = defaultFailure, error = defaultError) {
  axios
    .get(url, {
      withCredentials: true,
    })
    .then(({ data }) => {
      if (data.success) success(data.message, data.status);
      else if (data.status === 411) {
        store.auth.user = null;
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
        router.push("/");
      } else failure(data.message, data.status);
    })
    .catch(error);
}

export { get, post };
