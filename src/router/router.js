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

//解决ElementUI导航栏中的vue-router在3.0版本以上重复点击菜单报错的问题
import Router from 'vue-router';
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}