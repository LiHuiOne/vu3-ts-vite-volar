import $axios from '../serviceConfig/index'
const getFlowData = (cmd:string,params:object)=>{
    return $axios({
        url: `/api/itf-manage?cmd=${cmd}`,
        method:'get',
        params
    })
}

export default {
    getFlowData
}