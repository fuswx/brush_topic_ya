import {findAllInput} from "@/api";

const state={
    allInput: []
};

const mutations={
    FINDALLINPUT(state,allInput){
        state.allInput=allInput
    }
};

const actions={
    async findAllInput({commit}){
        let result=await findAllInput()
        if (result.code===200){
            commit("FINDALLINPUT",result.data)
        }
    }
};

const getters={};

export default {
    state,
    mutations,
    actions,
    getters
}