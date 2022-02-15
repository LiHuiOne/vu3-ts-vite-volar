<template lang="pug">
el-menu(class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#001C43" text-color="#fff" active-text-color="#fff")
    template(v-if="meunData.length")
        meunItem(:menuData="meunData")
</template>
<script lang="ts">
import { defineComponent,toRef,ref, computed } from 'vue'
import { useStore } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { menuRouter } from '@/router/menu_route'
import meunItem from './menu_item.vue'
export default defineComponent({
    setup(props,context) {
        const meunData : Array <RouteRecordRaw> = menuRouter
        const store = useStore()
        const isCollapse = computed(()=>store.state.isCollaspe)
        return {
            meunData,
            isCollapse,
        }
    },
    components:{
        meunItem
    }
})
</script>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
    height: calc(100% - 56px);
    background: #001c43;
    overflow: auto;
    border: none;
}
//start 顺序不能反
.el-menu-item:focus,
.el-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
}
.el-menu-item.is-active {
    background-color: #4a97eb !important;
}
</style>
