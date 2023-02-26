import {getAllQuestion, getQuestionById} from "@/api";

const state={
    question: {},
    questionItems: []
};

const mutations={
    GETQUESTIONBYID(state,question){
        state.question=question;
    },
    GETALLQUESTION(state,questionItems){
        state.questionItems=questionItems;
    }
};

const actions={
    async getQuestionById({commit},id){
        let result=await getQuestionById(id);
        if (result.code===200){
            commit("GETQUESTIONBYID",result.data)
        }
    },
    async getAllQuestion({commit},{pageNum,pageSize,sortType}){
        let result=await getAllQuestion({pageNum,pageSize,sortType});
        if (result.code===200){
            commit("GETALLQUESTION",result.data)
        }
    },
};

const getters={
    total(state){
        if (state.questionItems!==undefined){
            return state.questionItems.total
        }
        return 0
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}