# Vue 3 + Vite
## 项目的初始化步骤：
### ①：使用vite安装并删除代码
    npm 6.x
    npm init vite@latest my-vue-app --template vue
    npm 7+, 需要额外的双横线：
    npm init vite@latest my-vue-app -- --template vue
### ②：安装typescript 并在src文件夹下创建declare.d.ts声明文件，解决引入vue文件时报错问题
    npm install --save-dev typescript
    npm install --save-dev @vue/cli-plugin-typescript
### ③：安装 pug使用模板新语法
    npm i -D pug pug-html-loader pug-plain-loader
### ④：安装element-plus,并设置默认中文
    main.js文件夹：import locale from 'element-plus/lib/locale/lang/zh-cn'
                app.use(ElementPlus,{ locale }).mount('#app')
### ⑤：配置vite.config.ts 解决@别名使用问题
    resolve:{
		alias:{
			'@': resolve(__dirname, 'src')
		}
	}
### ⑥：配置tscongfig.json解决ts不能识别@别名问题
    "baseUrl": ".",
	"paths": {
		"@/*": ["*","src/*"]
	}
### ⑦：根目录创建ts文件解决不能ts不能识别vue文件问题，放在项目根目录文件夹下
    declare module '*.vue' {
        import { App, defineComponent } from 'vue'
        const component: ReturnType<typeof defineComponent> & {
            install(app: App): void
        }
        export default component
    }
### ⑧：安装vuex(4.0版本的)
    npm i vuex@4.0.0 -D
### ⑨：安装css编译sass sass-loader
    npm i sass@1.24.0 sass-loader@8.0.0 -D
### ⑩：安装axios，并添加配置
    npm  i axios -D
### 十一：安装echarts
    npm i echarts -D

### 十二：安装element-resize-detector(解决窗口变化图标的自适应问题)
    npm i element-resize-detector
    注意：引入时报找不到element-resize-detector模块问题，请看项目中devNote.md
