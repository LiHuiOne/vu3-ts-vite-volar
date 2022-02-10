# Vue 3 + Vite
## 项目的初始化步骤：
### ①：使用vite安装并删除代码
### ②：安装typescript 并在src文件夹下创建declare.d.ts声明文件，解决引入vue文件时报错问题
    npm install --save-dev typescript
    npm install --save-dev @vue/cli-plugin-typescript
### ③：安装 pug使用模板新语法
    npm i -D pug pug-html-loader pug-plain-loader
### 安装element-plus,并设置默认中文
    main.js文件夹：import locale from 'element-plus/lib/locale/lang/zh-cn'
                app.use(ElementPlus,{ locale }).mount('#app')