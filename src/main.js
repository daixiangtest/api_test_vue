// 全局配置注册
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入暗黑模式主题
import 'element-plus/theme-chalk/dark/css-vars.css'
// 导入全局的样式
import './style/global.scss'
// 导入pinia 做全局配置
import pinia from './store/index'

const app = createApp(App)
// 注册ElementPlus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
// 注册ElementPlus 国际化为中文

// 解决解决element-plus 报错 ResizeObserver loop limit exceeded
// --------main.js---------------------
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}
const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

app.use(ElementPlus, {
    locale: zhCn,
  })
// 注册pinia 
app.use(pinia)
app.use(router).mount('#app')