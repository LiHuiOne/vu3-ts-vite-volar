<template lang="pug">
div.tableInfoContainer
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
            @size-change="getTableData"
            @current-change="getTableData"
            )
</template>
<script lang="ts">
    interface response {
        data:Array<any>,
        count:number,
        msg?:string
    }
    import { defineComponent,toRef,ref, onBeforeMount,nextTick} from 'vue'
    export default defineComponent({
        props:['sourceData','tableCoumnData'],
        setup(props,context){
            //表格数据--function
            const sourceData = toRef(props,'sourceData')
            //动态列
            //const tableCoumnData = toRef(props,'tableCoumnData')
            const tableData = ref<Array<any>>([])
            const loading = ref(false)
            const total = ref(0)
            const currentPage = ref(1)
            const pageSize = ref(10)
            //调用表格传递的方法，请求表格数据
            const getTableData=()=>{
                let params = {
                    pageSize:pageSize.value,
                    pageNo:currentPage.value
                }
                loading.value = true
                sourceData.value(params).then((res:response)=>{
                    //保证dom创建更新完毕，在填充数据
                    nextTick(()=>{
                        tableData.value =  res.data||[]
                        total.value = res.count
                        loading.value = false
                    })
                })
            }
            //调用方法，请求数据
            onBeforeMount(()=>{
                getTableData()
            })
            return {
                pageSize,
                currentPage,
                tableData,
                total,
                loading,
                getTableData
            }
        }
    })
</script>
<style lang="scss">
.tableInfoContainer{
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