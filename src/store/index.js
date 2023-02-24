//需要使用插件一次
import Vue from "vue";
import Vuex from "vuex";

//引入小仓库
import Slider from "@/store/Slider";
import SetTopic from "@/store/Topic/SetTopic";
import GetTopic from "@/store/Topic/GetTopic";

Vue.use(Vuex);

//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现Vuex仓库模块化开发存储数据
    modules: {
        Slider,
        SetTopic,
        GetTopic
    }
})