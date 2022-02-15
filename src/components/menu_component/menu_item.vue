<template lang="pug">
template(v-if="menuDataArr.length>0")
	template(v-for="menuItem in menuDataArr")
		template(v-if="menuItem.children")
			el-sub-menu(:index="menuItem.name")
				template(#title)
					el-icon
						//- component：使用图标组件
						component(:is="menuItem.meta.icon")
					span {{menuItem.meta.title}}
					//- 递归组件
				menuItemChild(:menuData="menuItem.children")
		template(v-else)
			el-menu-item(:index="menuItem.name" @click="toCurrentPage(menuItem)")
				el-icon
					component(:is="menuItem.meta.icon")
				span {{menuItem.meta.title}}
template(v-else)
	el-menu-item(:index="menuDataArr.name"  @click="toCurrentPage(menuDataArr)")
		el-icon
			component(:is="menuDataArr.meta.icon")
		span {{menuDataArr.meta.title}}
</template>
<script lang="ts">
import router from '@/router'
import { defineComponent,reactive,ref, toRef, toRefs } from 'vue'

export default defineComponent({
    name:"menuItemChild",
    props:['menuData'],
    setup(props,context) {
		const menuDataArr = toRef(props,'menuData')
		const toCurrentPage = (menu:any)=>{
			router.push({
				path:menu.path
			})
		}
		const data = reactive({
			menuDataArr:menuDataArr
		})
	   return {
			...toRefs(data),
			toCurrentPage
	   }
    },
})
</script>
<style lang="sass" scoped>

</style>
