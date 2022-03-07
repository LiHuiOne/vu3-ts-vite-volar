<template lang="pug">
div.layout
    div.layout_header Vue3+Typescript+vite+volar
    div.layout_main
        div.layout_menu
            div.collaspe(@click="changeCollaspe")
                el-icon
                    component(:is="isCollapse?'Expand':'Fold'")
            menuContainer
        div.layout_main_content
            router-view
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
    setup() {
        const store = useStore()
        const isCollapse = computed(()=>store.state.isCollaspe)
        const changeCollaspe = ()=>{
            store.commit('setCollaspe',!store.state.isCollaspe)
        }
        return {
            isCollapse,
            changeCollaspe
        }
    },
    components: {
        menuContainer: defineAsyncComponent(() => import("@/components/menu_component/index.vue"))
    }
})
</script>
<style lang="scss" scoped>
.layout {
    height: 100vh;
    .layout_header {
        height: 50px;
        color: #fff;
        font-size: 20px;
        line-height: 50px;
        box-sizing: border-box;
        padding-left: 20px;
        background: #003670;
    }
    .layout_menu{
        height: 100%;
        float: left;
        .collaspe{
            height: 56px;
            text-align: center;
            line-height: 56px;
            font-size: 20px;
            color: #ccc;
            cursor: pointer;
            background-color:#001C43;
        }
    }
    .layout_main {
        // display: flex;
        height: calc(100% - 50px);
        overflow: hidden;
        .layout_main_content{
            height: 100%;
            overflow-y:scroll;
            background: #f4f5f9;
            box-sizing: border-box;
            padding:20px;
        }
    }
}
</style>
    