<template lang="pug">
div.tableInfoContainer
    searchContainer(ref="search" v-if="searchConfig" :searchConfig="searchConfig" :inline="true")
    div.tableContentInfo
        div.tableBtn
            div
                el-button(type="primary" @click="reload") 搜索
                el-button(type="warning" @click="resetSearch") 重置
        el-table(v-loading="loading" :data="tableData" :header-cell-style="{background:'#eff0f1',fontWeight:'bold',color:'#000'}")
            el-table-column(
                v-for="colItem in tableCoumnData" 
                :prop="colItem.prop" :label="colItem.label" :width="colItem.width"
                :show-overflow-tooltip="colItem.showTooltip"
                )
            slot
        div.paginationInfoContainer
            el-pagination(
                v-model:currentPage="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10,20,50]"
                :small="true"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="reload"
                @current-change="reload"
                )
</template>
<script lang="ts">
    interface response {
        data:Array<any>,
        count:number,
        msg?:string
    }
    import { defineComponent,toRef,ref, toRefs,onBeforeMount,nextTick, defineAsyncComponent,getCurrentInstance} from 'vue'
    export default defineComponent({
        props:['sourceData','tableCoumnData','searchConfig'],
        setup(props,context){
            const { proxy }:any= getCurrentInstance();
            //表格数据--function
            const sourceData = toRef(props,'sourceData')
            //动态列
            const tableData = ref<Array<any>>([])
            const loading = ref(false)
            const total = ref(0)
            const currentPage = ref(1)
            const pageSize = ref(10)
            //const searchForm = ref({})
            //请求表格数据,如果需要搜索可以proxy.$refs['xxx'].reload()
            //proxy：const { proxy }:any= getCurrentInstance(); //此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
            const reload=()=>{
                const searchForm = proxy.$refs['search']?proxy.$refs['search'].getFormData():{}
                let params = {
                    ...searchForm,
                    pageSize:pageSize.value,
                    pageNo:currentPage.value
                }
                loading.value = true
                //调用表格传递的方法,请求表格数据
                sourceData.value(params).then((res:response)=>{
                    //保证dom创建更新完毕，在填充数据
                    nextTick(()=>{
                        tableData.value =  res.data||[]
                        total.value = res.count
                        loading.value = false
                    })
                })
            }
            const resetSearch = ()=>{
                proxy.$refs['search'].resetForm()
            }
            //调用方法，请求数据
            onBeforeMount(()=>{
                reload()
            })
            return {
                pageSize,
                currentPage,
                tableData,
                total,
                loading,
                reload,
                resetSearch
            }
        },
        components:{
            searchContainer:defineAsyncComponent(()=>import('@/components/search_component/index.vue'))
        }
    })
</script>
<style lang="scss">
.tableInfoContainer{
    .tableContentInfo{
        
        .tableBtn{
            position: relative;
            margin-bottom: 20px;
            height: 32px;
            &>div{
                position: absolute;
                right:0px;
            }
        }
    }
    .paginationInfoContainer{
        position: relative;
        height: 30px;
        .el-pagination--small{
            position: absolute;
            margin-top: 12px;
            right: 0px;
        }
    }
}
</style>