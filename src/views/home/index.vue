<template lang="pug">
div.homeLayout
    div.echartContainer(v-loading="loading")
        div.lineContainer(ref="lineEchartContainer")
</template>
<script lang="ts">
import {ref,onMounted} from 'vue'
import { useInitBarChart } from '@/components/echart/line_chart'
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        const lineEchartContainer = ref()
        const loading = ref(false)
        const echartData = ref({
            xAxisData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            yAxisData:[120, 132, 101, 134, 90, 230, 210]
        })
        onMounted(()=>{
            loading.value = true
            useInitBarChart(lineEchartContainer.value,echartData.value)
            setTimeout(()=>{
                loading.value = false
            },1000)
        })
        return {
            lineEchartContainer,
            loading
        }
    }
    
  

})
</script>
<style lang="scss" scoped>
    .homeLayout{
        .echartContainer{
            width: 100%;
            height: 300px;
            box-sizing:border-box;
            padding:20px;
            border:1px solid #aaa;
            .lineContainer{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
