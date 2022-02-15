import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { store } from '@/store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import * as ELIcons from '@element-plus/icons-vue'
const iconList:any = ELIcons
const app = createApp(App)
for (let iconName in ELIcons) {
	app.component(iconName, iconList[iconName])
}
app.use(ElementPlus,{ locale }).use(router).use(store).mount('#app')
