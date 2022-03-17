//解决不能ts不能识别vue文件问题，放在项目根目录文件夹下
declare module '*.vue' {
	import { App, defineComponent } from 'vue'
	const component: ReturnType<typeof defineComponent> & {
		install(app: App): void
	}
	export default component
}

declare module' element-resize-detector'