//使用setup组合API实现混入
import { ref } from 'vue'
export default function(){
    const searchConfig = ref([])
    searchConfig.value = [
        {
            label:'关键字',
            prop:'key_word',
            type:'text'
        },
        {
            label:'名称',
            prop:'template_name',
            type:'select',
            options:[
                {
                    label:'测试1',
                    value:'1'
                },
                {
                    label:'测试2',
                    value:'2'
                }
            ]
        },
        {
            label:'年份',
            prop:'year',
            type:'year'
        },
        {
            label:'月份',
            prop:'month',
            type:'month'
        },
        {
            label:'日期',
            prop:'date',
            type:'date'
        },
        {
            label:'月份范围',
            prop:'startTime&endTime',
            type:'monthrange'
        },
        {
            label:'日期范围',
            prop:'daterange',
            type:'daterange'
        },
        {
            label:'时间',
            prop:'datetime',
            type:'datetime'
        },
        {
            label:'时间范围',
            prop:'datetimerange',
            type:'datetimerange'
        }
    ]
    return {
        searchConfig
    }
}