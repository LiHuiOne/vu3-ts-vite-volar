# 开发过程遇到问题：
## 解决ts文件不能识别.vue文件问题
    并在根目录下创建declare.d.ts声明文件，解决引入vue文件时报错问题
## vite2使用别名@时并且报错问题 No loader is configured for “.vue”
    原因：vite2中已经舍弃了vite1.0的@/方式，直接使用@
    首先在vite.config配置
    resolve:{
		alias:{
			'@': resolve(__dirname, 'src')
		}
	},
## tsconfig.json配置别名&解决vue文件中不能使用别名问题：注意记得重启vscode
    "baseUrl": ".",
		"paths": {
			"@/*": ["*","src/*"]
	}
	vite.confing文件配置
	resolve:{
		alias:{
			'@': resolve(__dirname, 'src')
		}
	},
## 引入element-plus图标不显示问题
	npm install @element-plus/icons-vue
	main.js注册图标组件：iconList:any，解决类型问题
	import * as ELIcons from '@element-plus/icons-vue'
	const iconList:any = ELIcons
	const app = createApp(App)
	for (let iconName in ELIcons) {
		app.component(iconName, iconList[iconName])
	}
## 动态引入图标：使用component，因为图标是组件形式的
	component(:is="menuItem.meta.icon")
