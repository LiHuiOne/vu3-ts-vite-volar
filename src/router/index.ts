import { createRouter,createWebHashHistory,RouteRecordRaw } from 'vue-router'
import { menuRouter } from './menu_route'
const router = createRouter({
    history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
    scrollBehavior: () => ({
      top: 0,
    }),
    routes: [
        {
            path:'/login',
            component: () => import(/* webpackChunkName: login */ '@/views/login/index.vue'),
        },
        {
            path:'/',
            component: () => import(/* webpackChunkName: layout */ '@/views/layout/index.vue'),
            children:[
                ...menuRouter
            ]
        },
        
    ]
  
});

export default router