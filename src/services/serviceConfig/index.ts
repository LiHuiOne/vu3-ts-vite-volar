import Axios,{Method,AxiosResponse,ResponseType} from 'axios'
import { ElMessage } from 'element-plus'
const axios  = Axios.create({
    baseURL:'/api_server/v1',
    withCredentials:true,// 允许携带cookie
    timeout:20000,
})
// 默认使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

//请求拦截
axios.interceptors.request.use(
    (config:any)=>{
        console.log(config)
        if(localStorage.getItem('_token')){
            //Bearer:在某些情况下，这可以是一种无状态授权机制。
            //服务器的受保护路由将检查Authorization标头中是否存在有效的 JWT，如果存在，则允许用户访问受保护的资源。
            // config.headers.Authorization = `Bearer ${localStorage.getItem("_token")}`;
            config.headers['access_token'] = `${localStorage.getItem("_token")}`;
            //请求params里添加token
            config.params['access_token'] = `${localStorage.getItem("_token")}`;
        }
        return config
    }
    
)
//响应拦截
axios.interceptors.response.use(
    (response)=>{
        let data = response.data
        if(data.code=='1'){
            console.log("pppp")
            // localStorage.removeItem('_token')
            ElMessage.error({
                message: data.msg
            });
            //window.location.reload()
            return
        }
        if(typeof data=='string'){
            return JSON.parse(data)
        }
        return data
    },(err)=>{
        if (err && err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = "请求错误";
                    break;
                case 401:
                    err.message = "token过期，请重新登录";
                    //  可以在此移除本地缓存
                    //localStorage.removeItem('_token')
                    break;
                case 403:
                    err.message = "拒绝访问";
                    break;

                case 404:
                    err.message = `请求地址出错: ${err.response.config.url}`;
                    break;

                case 408:
                    err.message = "请求超时";
                    break;

                case 500:
                    err.message = "服务器内部错误";
                    break;

                case 501:
                    err.message = "服务未实现";
                    break;

                case 502:
                    err.message = "网关错误";
                    break;

                case 503:
                    err.message = "服务不可用";
                    break;

                case 504:
                    err.message = "网关超时";
                    break;

                case 505:
                    err.message = "HTTP版本不受支持";
                    break;

                default:
            }
        }
        if (err.response.status !== 401) {
            ElMessage.error({
                message: err.message
            });
        }else{
            window.location.reload();
        }
        return Promise.reject(err); // 返回接口返回的错误信息
    }
)
//导出该方法进行调用
export default function $axios(options:any){
    return new Promise((resolve,inject)=>{
        axios(options).then(res=>{
            resolve(res)
        }).catch(err=>{
            inject(err)
        })
    })
}

