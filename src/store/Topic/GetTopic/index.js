import {getTopicForm} from "@/api";

const state={
    form: {}
};

const mutations={
    GETTOPICFORM(state,form){
        state.form=form;
    }
};

const actions={
    async getTopicFrom({commit},formId){
        let result=await getTopicForm(formId);
        if (result.code===200){
            commit("GETTOPICFORM",result.data[0])
        }
    }
};

const getters={
    componentsName(state){
        const componentsName=[];
        if (state.form.components!==undefined){
            for (let i = 0; i < state.form.components.length; i++) {
                componentsName.push({name: state.form.components[i].componentName})
            }
        }
        return componentsName;
    },
};

export default {
    state,
    mutations,
    actions,
    getters
};