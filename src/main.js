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
app.use(ElementPlus, {
    locale: zhCn,
  })
// 注册pinia 
app.use(pinia)
app.use(router).mount('#app')