import $axios from '../serviceConfig/index'
const getTemplate = (cmd:string,params:any)=>{
    return $axios({
        url:`/report/report-template?cmd=${cmd}`,
        method:'get',
        params
    })
}

export default {
    getTemplate
}