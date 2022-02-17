import $axios from '../serviceConfig/index'
const userLogin = (data:any)=>{
    return $axios({
        url: '/auth/login/signin',
        method:'post',
        data
    })
}
export default {
    userLogin
}