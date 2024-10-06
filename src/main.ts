import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueAudio from 'vue-audio-better' // 导入 vue-audio-better

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueAudio) // 使用 vue-audio-better

app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
