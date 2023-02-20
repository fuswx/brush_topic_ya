//search模块的小仓库
import {findAllGrades, findAllSubjects, getSortGradeList} from "@/api";

const state={
    //全部年级
    gradeList: [],
    //各阶段年级
    sortGradeList: [[],[],[]],
    //全部学科
    subjectList: [],
};

const mutations={
    //全部年级
    GETGRADELIST(state,gradeList){
        state.gradeList=gradeList;
    },
    //获取各类别年级数据
    GETSORTGRADELIST(state,sortGradeList){
        state.sortGradeList=sortGradeList;
    },
    //全部学科
    GETSUBJECTLIST(state,subjectList){
        const subjectListRe=[];
        for (const subject of subjectList) {
            subjectListRe.push({
                label :subject.name
            })
        }
        state.subjectList=subjectListRe;
    }
};

const actions={
    //获取年级数据
    async getGradeList({commit}){
        let result=await findAllGrades();
        if (result.code===200){
            commit("GETGRADELIST",result.data);
        }
    },
    //获取各类别年级数据
    async getSortGradeList({commit}){
        let result=await getSortGradeList("小学");
        let result2=await getSortGradeList("初中");
        let result3=await getSortGradeList("高中");
        if (result.code===200&&result2.code===200&&result3.code===200){
            const lastResult=[result.data,result2.data,result3.data];
            commit("GETSORTGRADELIST",lastResult)
        }
    },

    //获取科目数据
    async getSubjectList({commit}){
        let result=await findAllSubjects();
        if (result.code===200){
            commit("GETSUBJECTLIST",result.data)
        }
    }
};

// [{label: '一年级', children: [{label: '语文',},{label: '数学',},{label: '英语',}]},
//     {label: '二年级', children: [{label: '语文',},{label: '数学',},{label: '英语',}]},
//     {label: '三年级', children: [{label: '语文',},{label: '数学',},{label: '英语',}]},
//     {label: '四年级', children: [{label: '语文',},{label: '数学',},{label: '英语',}]},
//     {label: '五年级', children: [{label: '语文',},{label: '数学',},{label: '英语',}]},
//     {label: '六年级', children: [{label: '语文',},{label: '数学',},{label: '英语',}]},
// ]

//计算属性，在项目中为简化数据而生
//项目中：getters主要的作用：简化仓库中的数据（简化数据而生）
//可以把我们将来在组件中需要使用的数据简化一下【将来组件在获取数据的时候就方便了】
const getters={
    //当前形参state，当前仓库中的state，并非大仓库中的那个state
    primary(state){
        const primary=[];
        for (var i = 0; i < state.sortGradeList[0].length; i++) {
            primary.push({
                label: state.sortGradeList[0][i].name,
                children: state.subjectList,
            })
        }
        return primary;
    },
    junior(state){
        const junior=[];
        for (var i = 0; i < state.sortGradeList[1].length; i++) {
            junior.push({
                label: state.sortGradeList[1][i].name,
                children: state.subjectList
            })
        }
        return junior;
    },
    high(state){
        const high=[];
        for (var i = 0; i < state.sortGradeList[2].length; i++) {
            high.push({
                label: state.sortGradeList[2][i].name,
                children: state.subjectList
            })
        }
        return high;
    },
    datas(state){
        let i;
        const datas=[];
        const primary=[];
        const junior=[];
        const high=[];
        for (i = 0; i < state.sortGradeList[1].length; i++) {
            junior.push({
                label: state.sortGradeList[1][i].name,
                children: state.subjectList
            })
        }
        for (i = 0; i < state.sortGradeList[0].length; i++) {
            primary.push({
                label: state.sortGradeList[0][i].name,
                children: state.subjectList,
            })
        }
        for (i = 0; i < state.sortGradeList[2].length; i++) {
            high.push({
                label: state.sortGradeList[2][i].name,
                children: state.subjectList
            })
        }
        datas.push({title:'小学题目', data:primary})
        datas.push({title:'初中题目', data:junior})
        datas.push({title: '高中题目', data: high})
        return datas;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}