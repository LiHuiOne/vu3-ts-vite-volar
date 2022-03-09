<template lang="pug">
div.login_container
    div.login_info
        div(class="form_container")
            el-form(class="loginForm" :model="loginForm" size="large")
                el-form-item(prop="username")
                    el-input(v-model.trim="loginForm.username" placeholder="请输入账号")
                el-form-item(prop="password")
                    el-input(type="password" v-model.trim="loginForm.password" show-password placeholder="请输入密码")
                el-form-item(prop="code")
                    div.code_info
                        el-input(v-model="vercode" placeholder="请输入验证码")
                        img(:src="verifyCode" @click="getCode")
            div.login_btn(@click="doLogin") 登录
</template>
<script lang="ts">
import { defineComponent,reactive,onMounted, toRefs,getCurrentInstance, } from 'vue'
import { randomValue } from '@/utils/method'
import { sha1 } from '@/utils/sha1.js'
export default defineComponent({
    setup(props,context) {
        // getCurrentInstance() 获取当前组件实例
        //const { ctx }  = getCurrentInstance();  //  方式一，这种方式只能在开发环境下使用，生产环境下的ctx将访问不到
        const { proxy }:any= getCurrentInstance(); //  方式二，此方法在开发环境以及生产环境下都能放到组件上下文对象（推荐）
        const data = reactive({
            loginForm:{
                username:'',
                password:''
            },
            verifyCode:'',
            vercode:'',
            enforce:'',
            randomData:''
        })
        const getCode = ():void=>{
            data.randomData = randomValue(16)
            data.verifyCode = '/api_server/v1/auth/captcha?cmd=set&rands='+data.randomData
        }
        const doLogin = ()=>{
            let params = {
                "login-username": data.loginForm.username,
                "login-password": sha1(data.loginForm.password +
                        'd7d5ee94f2eab14ebc30f63e9b702e68ebb4b70aa98c046d5611c8f66250d6f0'),
                "enforce": data.enforce,
                "token": data.randomData,
                "vercode": data.vercode
            }
            proxy.$api.userLogin(params).then((res:any)=>{
                console.log(res)
                localStorage.setItem('_token',res.data.access_token)
                proxy.$router.push({
                    path:'/home'
                })
            }).catch((err:any)=>{
                proxy.$message.error(err.msg)
            })
        }
        onMounted(()=>{
            getCode()
        })
        return {
            ...toRefs(data),
            getCode,
            doLogin
        }
    },
    methods:{
    }
})
</script>
<style lang="scss" scoped>
.login_container{
    height: 100vh;
    background-image: url('@/assets/img/bg.png');
    background-size: 100% 100%;
    .login_info{
        width: 400px;
        height: 400px;
        position: absolute;
        left:calc(50% - 200px);
        top:calc(50% - 200px);
        .form_container{
            width: 100%;
            box-sizing: border-box;
            padding: 49px 46px 47px;
            border: 2px solid #ddd;
            border-image: linear-gradient(#00a6ea,#00a6ea) 20 20;
            background: rgba(111,161,224,.17);
            .code_info{
                display: flex;
                justify-content: space-between;
                img{
                    margin-left: 10px;
                    width:100px;
                    height: 40px;
                    cursor: pointer;
                }
            }
            
        }
        .login_btn{
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            border-radius: 5px;
            color: #fff;
            background:#409eff;
            cursor: pointer;
        }
    }
}
</style>
