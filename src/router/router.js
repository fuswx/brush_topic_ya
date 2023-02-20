//配置路由
import Vue from "vue";
import VueRouter from "vue-router";
//使用插件
Vue.use(VueRouter);

import routers from "@/router/routers";


//配置路由
export default new VueRouter({
    //配置路由
    routes: routers,
    //滚动行为
    scrollBehavior(to,from,savedPosition){
        //返回的y=0代表滚动条在最上方
        return {y:0};
    }
})