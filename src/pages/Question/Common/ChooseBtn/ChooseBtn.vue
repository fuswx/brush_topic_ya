<template>
  <div id="chooseBtn">
    <div class="chooseBtnLine">
      <div class="chooseBtnLineItem">
        <span class="chooseBtnSpan">
          <span class="el-icon-search"></span>
          <span class="chooseBtnItemText" @click="searchQuestion">搜索</span>
        </span>
        <span class="searchMode">
          <input type="text" v-model="pageSearchText" placeholder="请输入查找题目">
          <el-button @click="searchQuestion" size="small" type="primary" plain>搜索</el-button>
        </span>
      </div>
    </div>
    <div class="chooseBtnLine">
      <div class="chooseBtnLineItem">
        <span class="chooseBtnSpan">
          <span class="el-icon-edit"></span>
          <span class="chooseBtnItemText">科目</span>
        </span>
        <SelectTag ref="subject" v-bind:select-info="{name:'科目',items: subjectList}"></SelectTag>
      </div>
    </div>
    <div class="chooseBtnLine">
      <div class="chooseBtnLineItem">
        <span class="chooseBtnSpan">
          <span class="el-icon-s-data"></span>
          <span class="chooseBtnItemText">阶段</span>
        </span>
        <span class="questionType">
          <el-select
              @change="sortChange"
              ref="select"
              v-model="chooseSort" size="small" placeholder="阶段">
          <el-option
              v-for="item in this.sortList"
              :key="item.label"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        </span>
      </div>
    </div>
    <div v-if="chooseSort!==null" class="chooseBtnLine">
      <div class="chooseBtnLineItem">
        <span class="chooseBtnSpan">
          <span class="el-icon-s-data"></span>
          <span class="chooseBtnItemText">年级</span>
        </span>
        <SelectTag ref="grade" v-bind:select-info="reGradeInfo"></SelectTag>
      </div>
    </div>
    <div class="chooseBtnLine">
      <div class="chooseBtnLineItem">
        <span class="chooseBtnSpan">
          <span class="el-icon-s-order"></span>
          <span class="chooseBtnItemText">题型</span>
        </span>
        <SelectTag ref="type" v-bind:select-info="{name:'题型',items: inputList}"></SelectTag>
      </div>
    </div>
    <div class="chooseBtnLine">
      <div class="chooseBtnLineItem">
        <span class="chooseBtnSpan">
          <span class="el-icon-s-order"></span>
          <span class="chooseBtnItemText">难度</span>
        </span>
        <SelectTag ref="degree" v-bind:select-info="{name:'难度',items: [{label:'0-1',value:0},{label:'1-2',value:0},{label:'2-3',value:0},{label:'3-4',value:0},{label:'4-5',value:0}]}"></SelectTag>
      </div>
    </div>
    <div class="chooseBtnLine">
      <div class="chooseBtnSearch" style="text-align: left;margin-left: 130px">
        <el-button style="font-size: 12px;font-weight: 600;" @click="searchQuestion" size="small" type="primary">检索</el-button>
        <el-button style="font-size: 12px;font-weight: 600;" @click="resetSearch" size="small" type="danger">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>

import {mapState} from "vuex";
import SelectTag from "@/pages/Question/Common/ChooseBtn/SelectTag.vue";

export default {
  name: "ChooseBtn",
  components: {SelectTag},
  props:['chooseInfo'],
  mounted() {
    this.$store.dispatch("getGradeList")
    this.$store.dispatch("getAllInput")

    this.$refs.select.$el.style.width="95px"
  },
  computed:{
    ...mapState({
      subjectList: state => state.Slider.subjectList,
      gradeList: state => state.Slider.gradeList,
      inputList: state => state.Question.inputList,
      sortGradeList: state => state.Slider.sortGradeList
    })
  },
  data(){
    return {
      pageSearchText: '',
      chooseSort: null,
      sortList: [{label:'小学',value:0},{label:'初中',value:1},{label:'高中',value:2}],
      reGradeInfo: {name:'年级',items:[]},
      conditions: {
        pageNum: this.chooseInfo.pageNum,
        pageSize: this.chooseInfo.pageSize,
        sortType: this.chooseInfo.sortType,
        title: null,
        subjectIds: null,
        gradeIds: null,
        types: null,
        degrees: null
      }
    }
  },
  methods: {
    sortChange(){
      this.reGradeInfo.items=[]
      for (let i = 0; i < this.sortGradeList[this.chooseSort].length; i++) {
        this.reGradeInfo.items.push({
          label: this.sortGradeList[this.chooseSort][i].name,
          value: this.sortGradeList[this.chooseSort][i].id
        })
      }
    },
    searchQuestion(){
      this.conditions.pageNum=this.chooseInfo.pageNum
      this.conditions.pageSize=this.chooseInfo.pageSize
      this.conditions.sortType=this.chooseInfo.sortType
      this.conditions.title=this.pageSearchText
      this.conditions.subjectIds=this.$refs.subject.dynamicValues
      if (this.$refs.grade!==undefined) {
        this.conditions.gradeIds = this.$refs.grade.dynamicValues
      }
      this.conditions.types=this.$refs.type.dynamicValues
      this.conditions.degrees=this.$refs.degree.dynamicValues
      this.$bus.$emit('getGradeIdAndSubjectId',this.subjectId,this.gradeId)
      this.$store.dispatch("getAllQuestion",this.conditions)
    },
    resetSearch(){
      this.chooseSort=null
      this.$refs.subject.inputVisible=false;
      this.$refs.subject.chooseValue='';
      this.$refs.subject.dynamicTags=[];
      this.$refs.subject.dynamicValues=[];
      if (this.$refs.grade!==undefined){
        this.$refs.grade.inputVisible=false;
        this.$refs.grade.chooseValue='';
        this.$refs.grade.dynamicTags=[];
        this.$refs.grade.dynamicValues=[];
      }
      this.$refs.type.inputVisible=false;
      this.$refs.type.chooseValue='';
      this.$refs.type.dynamicTags=[];
      this.$refs.type.dynamicValues=[];
      this.$refs.degree.inputVisible=false;
      this.$refs.degree.chooseValue='';
      this.$refs.degree.dynamicTags=[];
      this.$refs.degree.dynamicValues=[];
    }
  }
}
</script>

<style scoped lang="less">
@import "public/common";

.el-select {
  display: inline-block;
}

#chooseBtn {
  padding: 20px 10px;
  background-color: white;
  border-radius: @border-radius-all;
  box-shadow: @box-shadow-all;
  margin-bottom: 20px;

  .chooseBtnLine {
    margin-bottom: 10px;

    .chooseBtnLineItem {
      text-align: left;
      height: 33px;
      position: relative;

      & > * {
        height: 33px;
      }

      .chooseBtnSpan{
        margin-right: 20px;
        position: absolute;
        display: inline-block;
        line-height: 33px;
        padding: 0 10px;
        font-size: 14px;
        font-weight: 700;
        color: cornflowerblue;

        .chooseBtnItemText {
          margin-left: 10px;
        }
      }

      .searchMode {
        position: absolute;
        left: 130px;
        display: inline-block;

        input {
          width: 300px;
          height: 33px;
          outline: none;
          border: 2px cornflowerblue solid;
          border-radius: 5px;
          padding-left: 5px;
          padding-right: 60px;
          box-sizing: border-box;
        }

        button {
          margin-left: -59px;
          border-radius: 0 5px 5px 0;
          background-color: cornflowerblue;
          color: #f4f4f4;
          font-size: 14px;
          font-weight: 700;
          box-sizing: border-box;

          &:hover {
            background-color: #f4f4f4;
            color: cornflowerblue;
          }
        }
      }

      .questionType {
        position: absolute;
        left: 130px;
        display: inline-block;

        & > * {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>