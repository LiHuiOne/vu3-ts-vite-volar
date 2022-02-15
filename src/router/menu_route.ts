import { RouteRecordRaw } from 'vue-router'

export const menuRouter : Array<RouteRecordRaw> = [
    {
        path:'/home',
        name:'home',
        component: () => import(/* webpackChunkName: home */ '@/views/home/index.vue'),
        meta:{
            title:'首页',
            icon:'HomeFilled',

        }
    },
    {
        path:'/dashboard',
        name:'dashboard',
        component: () => import(/* webpackChunkName: dashboard */ '@/views/dashboard/index.vue'),
        meta:{
            title:'仪表盘',
            icon:'stopwatch'
        },
        children:[
            {
                path:'/dashboard/test',
                name:'test',
                component: () => import(/* webpackChunkName: dashboard */ '@/views/dashboard/index.vue'),
                meta:{
                    title:'仪表盘1',
                    icon:''
                }
            }
        ]
    }
]