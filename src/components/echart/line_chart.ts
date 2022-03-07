import * as echarts from 'echarts';
import {
    TooltipComponent,
    TooltipComponentOption,
    GridComponent,
    GridComponentOption
} from 'echarts/components';
import { BarChart, BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer] as any);
type EChartsOption = echarts.ComposeOption<
    TooltipComponentOption | GridComponentOption | BarSeriesOption | LineSeriesOption
>;

let option: EChartsOption
interface echartDataFormatter{
  xAxisData:Array<any>
  yAxisData:Array<any>
}
export const useInitBarChart = (chartDom: HTMLElement | undefined,echartData:echartDataFormatter) => {
    setTimeout(()=>{
        const myChart = echarts.init(chartDom as HTMLElement)
        option = {
            grid: {
                left: '1%',
                right: '1%',
                bottom: '3%',
                containLabel: true
            },
            title:{
                text:'折线图'
            },
            xAxis: {
                type: 'category',
                data: echartData.xAxisData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: echartData.yAxisData,
                    stack: 'Total',
                    type: 'line'
                }
            ],
            color: "#409eff",
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    axis: "auto",
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
        };

        option && myChart.setOption(option)
        
    },500)
    
}

export default { useInitBarChart }
