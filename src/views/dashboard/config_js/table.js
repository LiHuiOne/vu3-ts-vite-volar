//使用setup组合API实现混入
import { ref } from 'vue'
export default function(){
    const tableColumns = ref([])
    tableColumns.value = [
        {
            label:'日期',
            prop:'create_time'
        },
        {
            label:'名称',
            prop:'template_name'
        }
    ]
    return {
        tableColumns
    }
}