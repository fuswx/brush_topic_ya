//当前这个模块：API进行统一管理
import requests from "@/api/request";

/*
年级Grade相关API
 */
//获取全部年级信息
export const findAllGrades=()=>requests({
    url: "/grade/findAllGrades.do",
    method: 'get'
});

export const getSortGradeList=(params)=>requests({
    url: '/grade/findAllGradeByCategory.do',
    method: 'post',
    params: {
        category: params
    }
})


/*
科目Subject相关API
 */
//获取全部学科信息
export const findAllSubjects=()=>requests({
    url: '/subject/findAllSubjects.do',
    method: 'get'
})

/*
Topic相关API
 */
export const findOneInput=(id)=>requests({
    url: `/input/showOne.do/${id}`,
    method: 'get'
})
export const findAllInput=()=>requests({
    url: `/input/findAll.do`,
    method: 'get'
})

export const submitDefinitionForm=(form)=>requests({
    url: '/form/saveForm.do',
    method: 'post',
    data: form,
})

export const getTopicForm=(formId)=>requests({
    url: `/form/getForm.do`,
    method: 'get',
    params: {
        formId
    }
})

export const getAllForm=(params)=>{
    return requests({
    url: `/form/getAllForm.do?pageNum=${params.pageNum}&pageSize=${params.pageSize}`,
    method: 'get',
})}

/*
Question相关API
 */
export const getQuestionById=(id)=>requests({
    url: `/question/getQuestionById.do?id=${id}`,
    method: 'get'
})

export const getAllQuestion=(params)=>requests({
    url: `/question/getAllQuestion.do`,
    method: 'post',
    data: params
})

export const getCommentByQuestionId=(params)=>requests({
    url: `/comment/getCommentByQuestionId.do?pageNum=${params.pageNum}&pageSize=${params.pageSize}&questionId=${params.questionId}&userId=${params.userId}`,
    method: 'get'
})

export const getCommentByQuestionIdAndUserId=(params)=>requests({
    url: `/comment/getCommentByQuestionIdAndUserId.do?questionId=${params.questionId}&userId=${params.userId}`,
    method: 'get'
})

export const getAddCommentByQuestionId=(params)=>requests({
    url: `/comment/getAddCommentByQuestionId.do?pageNum=${params.pageNum}&pageSize=${params.pageSize}&commentId=${params.commentId}&userId=${params.userId}`,
    method: 'get'
})

export const getAddCommentByQuestionIdAndUserId=(params)=>requests({
    url: `/comment/getAddCommentByQuestionIdAndUserId.do?commentId=${params.commentId}&userId=${params.userId}`,
    method: 'get'
})

export const getAllInput=()=>requests({
    url: `/input/findAll.do`,
    method: 'get'
})

export const setQuestionForm=(question)=>requests({
    url: `/question/setQuestionForm.do`,
    method: 'post',
    data: question
})

export const getQuestionByKeyCode=(keyCode)=>requests({
    url: `/question/getQuestionByKeyCode.do?keyCode=${keyCode}`,
    method: 'get'
})