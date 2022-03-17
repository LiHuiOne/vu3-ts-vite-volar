import * as echarts from 'echarts';
import { lineColor } from '@/utils/dictionary'
import elementResizeDetectorMaker from 'element-resize-detector'
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
        let myChart = echarts.init(chartDom as HTMLElement)
        option = {
            title:{
                text:'暂无数据~',
                show:echartData.yAxisData.length==0?true:false,
                x:'center',
                y:'center',
                textStyle:{
                    fontSize:'20px',
                    color:'#aaa'
                }
            },
            //调整表格位置
            grid:{
                left:60,
                right:20,
                top:60,
                bottom:10
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params:any) {
                　　var result = ''
                　　params.forEach(function (item:any,index:number) {
                　　　　result += `<span style="font-size:14px;font-weight:500;color:#000000;">${item.axisValue}</span>` +'：'+ `<span style="font-size:12px;color:#666666;">${index==0?'流量总量':'丢包流量'}：${item.data}Mb/s</span></br>`
                　　})
                　　return result
                }
            },
            xAxis: {
                data: echartData.xAxisData,
                type: 'category',
                boundaryGap: false,
                axisLine:{
                    show:false,
                    lineStyle:{
                        type:'dashed',
                        opacity:0.4
                    }
                },
                axisLabel:{
                    show:false,
                    fontSize:'12px',
                    color:'#666666',
                    fontWeight:400
                },
                axisTick:{
                    show:false
                }
            },
            yAxis: {
                name:'(Mb/s)',
                type: 'value',
                interval:1500,//设置刻度值
                minInterval:0,
                nameTextStyle:{
                    padding:[60,50,0,0]
                },
                //背景网格线设置虚线
                splitLine: {
                    show: false,//去掉网格线
                    // lineStyle:{
                    //     type:'dashed'
                    // }
                }

                
            },
            series:echartData.yAxisData.map((item,index)=>{
                return {
                    type: 'line',
                    data: item.data,
                    smooth: true,//曲线,
                    //symbol:'none',//去掉折线的点
                    showSymbol:false,//鼠标移动显示圆点
                    color:lineColor[index]||lineColor[0],//小圆点和线的颜色
                    //折线颜色
                    lineStyle:{
                        width:1.5,
                        color:lineColor[index]||lineColor[0]
                    }
                }
            })
        }

        option && myChart.setOption(option)
        //监听窗口变化重绘图表
        elementResizeDetectorMaker().listenTo(chartDom as HTMLElement,()=>{
            myChart.resize()
        })
    },500)
    
}

export default { useInitBarChart }
