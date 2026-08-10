import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 部分安卓内嵌 WebView 没有实现 flatMap，筛选项初始化会因此中断。
import 'core-js/es/array/flat-map';
import App from './App.vue'
import router from './router'
import bus from '@/utils/bus.js'
import '@/common/css/common.less';

// 一次性注册 src/icons 目录下的全部 SVG symbol。
function loadSvgIcons() {
  const iconFiles = require.context('./icons', false, /\.svg$/);
  iconFiles.keys().forEach(iconFiles);
}

loadSvgIcons();

// 自定义移动端自适应（替代 amfe-flexible，限制最大宽度）
;(function flexible() {
  const docEl = document.documentElement
  const maxWidth = 500 // 最大宽度限制
  
  function setRemUnit() {
    const width = Math.min(docEl.clientWidth, maxWidth)
    const rem = width / 10
    docEl.style.fontSize = rem + 'px'
  }
  
  setRemUnit()
  
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      setRemUnit()
    }
  })
})()

// 引入 Vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入 Element Plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入 Vue I18n
import { createI18n } from 'vue-i18n'

// 配置 i18n
const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en',
  messages: {
    'zh-CN': {
      // 中文语言包
    },
    'en': {
      // 英文语言包
    }
  }
})

const app = createApp(App)
const pinia = createPinia()

// 注册 Element Plus 所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.config.globalProperties.$bus = bus;

app.use(pinia)
   .use(router)
   .use(Vant)
   .use(ElementPlus)
   .use(i18n)
   .mount('#app')
