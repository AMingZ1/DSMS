import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import echarts from './echarts/echarts'
import $ from 'jquery'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

// app.config.globalProperties.$echarts = echarts

app.use(store).use(router).use(ElementPlus,{
  locale: zhCn,
}).mount('#app')

//用于去掉eazyplayer警告,开发时禁用，打包开启
app.config.warnHandler = () => {}

// 防止sessionStorage被修改
window.addEventListener('storage', function(e) {
  this.sessionStorage.setItem(e.key, e.oldValue)
});

