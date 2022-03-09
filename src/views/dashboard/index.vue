<template lang="pug">
div.baseContainer
    qz-table(:sourceData="getTableData" :tableCoumnData="tableColumns")
        el-table-column(label="报表类型" prop="template_type")
            template(#default="scope")
                span {{scope.row.template_type=='1'?'自定义报表':'交互式报表'}}
        el-table-column(label="操作")
            span(class="textBtn") 删除
</template>
<script lang="ts">
import { defineComponent,onBeforeMount,ref,getCurrentInstance } from 'vue'
import tableColumnConfig from './config_js/table.js'
export default defineComponent({
    setup() {
        const { proxy }:any= getCurrentInstance(); //此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
        const  { tableColumns }  = tableColumnConfig()
        const tableData = ref([])
        const getTableData = (pageInfo:any)=>{
            let params = {
                pageSize:pageInfo.pageSize,
                pageNo:pageInfo.pageNo
            }
            return proxy.$api.getTemplate('index',params)
        }
        return {
            tableData,
            tableColumns,
            getTableData
        }
    },
})
</script>
<style lang="scss" scoped>
</style>
