<template lang="pug">
div.homeLayout
    div.echartContainer(ref="echartContainer" v-loading="loading")
        div.title 今日流量分析
        div.lineContainer(ref="lineEchartContainer")
</template>
<script lang="ts">
import { useInitBarChart } from '@/components/echart/line_chart'
import { defineComponent,getCurrentInstance,nextTick,onMounted,ref} from 'vue'
import elementResizeDetectorMaker from 'element-resize-detector'
export default defineComponent({
    setup() {
        const { proxy }:any = getCurrentInstance()
        const lineEchartContainer = ref()
        const echartContainer = ref()
        const loading = ref(false)
        const echartData = ref({
            xAxisData:[],
            yAxisData:[]
        })
        onMounted(()=>{
            loading.value = true
            proxy.$api.getFlowData('proxy',{uuid:'ed0c2cc5-b3b8-45af-9628-6e44a82bdc41'}).then((res:any)=>{
                echartData.value.xAxisData = res.xAxisData||[]
                echartData.value.yAxisData = res.yAxisData||[]
                useInitBarChart(lineEchartContainer.value,echartData.value)
                loading.value = false
            })
            // elementResizeDetectorMaker().listenTo(echartContainer.value,()=>{
              
            // })
        })
        return {
            lineEchartContainer,
            echartContainer,
            loading
        }
    }
    
  

})
</script>
<style lang="scss" scoped>
    .homeLayout{
        .echartContainer{
            position: relative;
            width: 100%;
            height: 130px;
            border:1px solid #aaa;
            .title{
                position: absolute;
                top: 10px;
                left: 20px;
                font-size: 14px;
                color: #333;
                font-weight: 600;
            }

            .lineContainer{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
