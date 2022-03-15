<template lang="pug">
div.formContainer
    el-form(:model="searchForm" :inline="inline" :label-position="inline?'right':'left'" label-width="80px")
        el-form-item(v-for="formItem in searchConfig" :label="formItem.label" :prop="formItem.prop")
            el-input(v-if="formItem.type=='text'" v-model="searchForm[formItem.prop]" :placeholder="formItem.placeholder||'请输入'")
            el-select(v-if="formItem.type=='select'" v-model="searchForm[formItem.prop]" :placeholder="formItem.placeholder||'请选择'")
                el-option(v-for="optionItem in formItem.options" :label="optionItem.label" :value="optionItem.value" :key="optionItem.value")
            el-date-picker(v-if="formItem.type=='year'" type="year" value-format="YYYY" v-model="searchForm[formItem.prop]" :placeholder="formItem.placeholder||'请选择日期'")
            el-date-picker(v-if="formItem.type=='month'" type="month" value-format="YYYY-MM" v-model="searchForm[formItem.prop]" :placeholder="formItem.placeholder||'请选择日期'")
            el-date-picker(v-if="formItem.type=='date'" type="date" value-format="YYYY-MM-DD" v-model="searchForm[formItem.prop]" :placeholder="formItem.placeholder||'请选择日期'")
            el-date-picker(v-if="formItem.type=='monthrange'" type="monthrange" value-format="YYYY-MM" v-model="searchForm[formItem.prop]" range-separator="-" :start-placeholder="formItem.startPlaceholder||'开始月份'" :end-placeholder="formItem.endPlaceholder||'结束月份'")
            el-date-picker(v-if="formItem.type=='daterange'" type="daterange" value-format="YYYY-MM-DD" v-model="searchForm[formItem.prop]" range-separator="-" :start-placeholder="formItem.startPlaceholder||'开始日期'" :end-placeholder="formItem.endPlaceholder||'结束日期'")
            el-date-picker(v-if="formItem.type=='datetime'" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" v-model="searchForm[formItem.prop]" :placeholder="formItem.placeholder||'请选择日期'")
            el-date-picker(v-if="formItem.type=='datetimerange'" type="datetimerange" value-format="YYYY-MM-DD HH:mm:ss" v-model="searchForm[formItem.prop]" range-separator="-" :start-placeholder="formItem.startPlaceholder||'开始时间'" :end-placeholder="formItem.endPlaceholder||'结束时间'")
</template>
<script lang="ts">
    interface IsearchConfigObj {
        prop:string|Array<string>,
        label:string,
        options?:Array<object>,
        type:string
    }
    import { defineComponent,watch,toRef,ref,reactive,toRefs, onBeforeMount } from 'vue'
    export default defineComponent({
        props:['searchConfig','inline'],
        setup(props,context){
            const searchForm = ref<any>({})
            //重置表单
            //const { proxy }:any= getCurrentInstance(); //此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
            //proxy.$refs['search'].resetForm()
            const resetForm = ()=>{
                searchForm.value = {}
            }
            //获取表单的方式
            //proxy.$refs['search'].getFormData()
            const getFormData = ():object=>{
                let formInfo:any = {}
                for(let key in searchForm.value){
                    if(key.includes('&')){
                        let keys = key.split("&")
                        formInfo[keys[0]] = searchForm.value[key][0]
                        formInfo[keys[1]] = searchForm.value[key][1]
                    }else{
                        formInfo[key] =  searchForm.value[key]
                    }
                }
                return formInfo
            }
            return {
                searchForm,
                getFormData,
                resetForm
            }
        }
        
    })
</script>
<style lang="scss">
    .formContainer{
       .el-form-item{
           margin-right: 0px;
            //搜索框统一的样式
            .el-input,.el-select,.el-range-editor.el-input__inner{
                width: 300px !important;
            }
       }
    }
</style>