
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import '@/access'
import VueCropper from 'vue-cropper';
import 'vue-cropper/dist/index.css'


const app = createApp(App)
app.use(Antd);
app.use(createPinia())
app.use(router)
app.use(VueCropper)


app.mount('#app')




