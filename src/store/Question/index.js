import {
    getAddCommentByQuestionId, getAddCommentByQuestionIdAndUserId, getAllInput,
    getAllQuestion,
    getCommentByQuestionId,
    getCommentByQuestionIdAndUserId,
    getQuestionById
} from "@/api";

const state={
    question: {},
    questionItems: [],
    commentItems: [],
    userComment: {},
    addCommentItems: [],
    userAddComment: {},
    inputList:[]
};

const mutations={
    GETQUESTIONBYID(state,question){
        state.question=null;
        state.question=question;
    },
    GETALLQUESTION(state,questionItems){
        state.questionItems=[]
        state.questionItems=questionItems;
    },
    GETCOMMENTBYQUESTIONID(state,commentItems){
        state.commentItems=[]
        state.commentItems=commentItems;
    },
    GETCOMMENTBYQUESTIONIDANDUSERID(state,userComment){
        state.userComment=null
        state.userComment=userComment;
    },
    GETADDCOMMENTBYQUESTIONID(state,addCommentItems){
        state.addCommentItems=[];
        state.addCommentItems=addCommentItems;
    },
    GETADDCOMMENTBYQUESTIONIDANDUSERID(state,userAddComment){
        state.userAddComment=null;
        state.userAddComment=userAddComment;
    },
    GETALLINPUT(state,inputList){
        const inputListRe=[];
        for (const input of inputList) {
            inputListRe.push({
                label :input.desc,
                value: input.name
            })
        }
        state.inputList=inputListRe;
    }
};

const actions={
    async getQuestionById({commit},id){
        let result=await getQuestionById(id);
        if (result.code===200){
            commit("GETQUESTIONBYID",result.data)
        }
    },
    async getAllQuestion({commit},params){
        let result=await getAllQuestion(params);
        if (result.code===200){
            commit("GETALLQUESTION",result.data)
        }
    },
    async getCommentByQuestionId({commit},{pageNum,pageSize,questionId,userId}){
        let result=await getCommentByQuestionId({pageNum,pageSize,questionId,userId});
        if (result.code===200){
            commit("GETCOMMENTBYQUESTIONID",result.data)
        }
    },
    async getCommentByQuestionIdAndUserId({commit},{questionId,userId}){
        let result=await getCommentByQuestionIdAndUserId({questionId,userId});
        if (result.code===200){
            commit("GETCOMMENTBYQUESTIONIDANDUSERID",result.data)
        }
    },
    async getAddCommentByQuestionId({commit},{pageNum,pageSize,commentId,userId}){
        let result=await getAddCommentByQuestionId({pageNum,pageSize,commentId,userId});
        if (result.code===200){
            commit("GETADDCOMMENTBYQUESTIONID",result.data)
        }
    },
    async getAddCommentByQuestionIdAndUserId({commit},{commentId,userId}){
        let result=await getAddCommentByQuestionIdAndUserId({commentId,userId});
        if (result.code===200){
            commit("GETADDCOMMENTBYQUESTIONIDANDUSERID",result.data)
        }
    },
    //获取所有题目类型
    async getAllInput({commit}){
        let result=await getAllInput();
        if (result.code===200){
            commit("GETALLINPUT",result.data)
        }
    }
};

const getters={
    total(state){
        if (state.questionItems!==undefined){
            return state.questionItems.total
        }
        return 0
    },
    comments(state){
        if (state.commentItems.list!==undefined){
            for (let i = 0; i < state.commentItems.list.length; i++) {
                state.commentItems.list[i].commentTime=timeStampString(state.commentItems.list[i].commentTime)
            }
        }
        return state.commentItems;
    }
};

function timeStampString(time) {
    var datetime = new Date(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year+"年"+month+"月"+date+"日";
}

export default {
    state,
    mutations,
    actions,
    getters
}