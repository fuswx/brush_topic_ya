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