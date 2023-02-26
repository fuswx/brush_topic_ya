import {getAllForm} from "@/api";

const state={
    forms: []
};

const mutations={
    GETALLFORM(state,forms){
        state.forms=forms;
    }
};

const actions={
    async getAllForm({commit},{pageNum,pageSize}){
        let result=await getAllForm({pageNum,pageSize});
        if (result.code===200){
            commit("GETALLFORM",result.data)
        }
    }
};

const getters={
    pageInfo(state){
        let pageInfo={};
        if (state.forms!==undefined){
            pageInfo = {
                pageSize: state.forms.pageSize,
                pageNum: state.forms.pageNum,
                pages: state.forms.pages,
                total: state.forms.total,
                dispatchPath: "getAllForm",
            }
        }
        return pageInfo;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};