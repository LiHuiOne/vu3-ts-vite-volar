import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import { store } from '@/store/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'//中文
import 'dayjs/locale/zh-cn' //中文
import * as ELIcons from '@element-plus/icons-vue'
import '@/permission'
import api from '@/services/interface'
import table from '@/components/table/index.vue'
const iconList:any = ELIcons
const app = createApp(App)
for (let iconName in ELIcons) {
	app.component(iconName, iconList[iconName])
}
//将api方法挂载到原型上
app.config.globalProperties.$api=api
//挂载全局组件
app.component('qz-table',table)
app.use(ElementPlus,{ locale }).use(router).use(store).mount('#app')
