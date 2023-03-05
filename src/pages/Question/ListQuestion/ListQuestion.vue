<template>
  <div id="listQuestion">
    <ChooseBtn v-bind:chooseInfo="{pageNum:this.questionItems.pageNum,pageSize:this.questionItems.pageSize,sortType:this.sortType}" ref="chooseBtn"></ChooseBtn>
    <div id="questionBox">
      <el-tabs v-model="sortType" @tab-click="handleClick">
        <el-tab-pane label="最新" name="time">
          <el-empty :image-size="200" description="暂无此类型题目" v-if="questionItems.total===0"></el-empty>
          <div class="questionItem" v-for="(question) in questionItems.list" :key="question.id">
            <div class="questionTitle">
              <router-link :to="`/question/getQuestion?id=${question.id}`">{{question.title}}</router-link>
            </div>
            <div class="questionLabel">
              <span class="questionSorts">类型:<span>{{question.typeName}}</span></span>
              <span class="questionDegree">
                <span>难度：</span><el-rate v-model="question.degree" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
              </span>
            </div>
            <div class="questionContent">
              <span class="questionCollect">
                <span>收藏</span>
                <span style="margin-left:3px;font-size: 16px;color: gold;" class="el-icon-star-on"></span>
                <span style="margin-left:3px;">{{question.collectCount}}</span>
              </span>
              <span class="questionChat">
                <span style="cursor: pointer;"><router-link style="color: #9c9999;text-decoration: none" :to="'/question/getQuestion?id='+question.id">讨论</router-link></span>
                <span style="cursor: pointer;margin-left:3px;" class="el-icon-chat-dot-square"></span>
                <span style="margin-left:3px;">{{question.answerCount}}</span>
              </span>
              <span class="questionWatch">
                <span style="cursor: pointer;"><router-link :to="'/question/getQuestion?id='+question.id">查看</router-link></span>
                <span style="cursor: pointer;margin-left:3px;" class="el-icon-view"></span>
                <span style="margin-left:3px;">5</span>
              </span>
            </div>
            <div class="questionInfo">
              <el-tag style="cursor: pointer" size="small">分类</el-tag>
              <el-tag style="cursor: pointer" type="success" size="small">{{question.grade}}</el-tag>
              <el-tag style="cursor: pointer" type="info" size="small">{{question.subject}}</el-tag>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最多收藏" name="collect">
          <el-empty :image-size="200" description="暂无此类型题目" v-if="questionItems.total===0"></el-empty>
          <div class="questionItem" v-for="(question) in questionItems.list" :key="question.id">
            <div class="questionTitle">
              <router-link :to="`/question/getQuestion?id=${question.id}`">{{question.title}}</router-link>
            </div>
            <div class="questionLabel">
              <span class="questionSorts">类型:<span>{{question.typeName}}</span></span>
              <span class="questionDegree">
                <span>难度：</span><el-rate v-model="question.degree" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
              </span>
            </div>
            <div class="questionContent">
              <span class="questionCollect">
                <span>收藏</span>
                <span style="margin-left:3px;font-size: 16px;color: gold;" class="el-icon-star-on"></span>
                <span style="margin-left:3px;">{{question.collectCount}}</span>
              </span>
              <span class="questionChat">
                <span style="cursor: pointer;"><router-link style="color: #9c9999;text-decoration: none" :to="'/question/getQuestion?id='+question.id">讨论</router-link></span>
                <span style="cursor: pointer;margin-left:3px;" class="el-icon-chat-dot-square"></span>
                <span style="margin-left:3px;">{{question.answerCount}}</span>
              </span>
              <span class="questionWatch">
                <span style="cursor: pointer;"><router-link :to="'/question/getQuestion?id='+question.id">查看</router-link></span>
                <span style="cursor: pointer;margin-left:3px;" class="el-icon-view"></span>
                <span style="margin-left:3px;">5</span>
              </span>
            </div>
            <div class="questionInfo">
              <el-tag size="small">分类</el-tag>
              <el-tag type="success" size="small">{{question.grade}}</el-tag>
              <el-tag type="info" size="small">{{question.subject}}</el-tag>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最多人看" name="watch">
          <el-empty :image-size="200" description="暂无此类型题目" v-if="questionItems.total===0"></el-empty>
          <div class="questionItem" v-for="(question) in questionItems.list" :key="question.id">
            <div class="questionTitle">
              <router-link :to="`/question/getQuestion?id=${question.id}`">{{question.title}}</router-link>
            </div>
            <div class="questionLabel">
              <span class="questionSorts">类型:<span>{{question.typeName}}</span></span>
              <span class="questionDegree">
                <span>难度：</span><el-rate v-model="question.degree" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
              </span>
            </div>
            <div class="questionContent">
              <span class="questionCollect">
                <span>收藏</span>
                <span style="margin-left:3px;font-size: 16px;color: gold;" class="el-icon-star-on"></span>
                <span style="margin-left:3px;">{{question.collectCount}}</span>
              </span>
              <span class="questionChat">
                <span style="cursor: pointer;"><router-link style="color: #9c9999;text-decoration: none" :to="'/question/getQuestion?id='+question.id">讨论</router-link></span>
                <span style="cursor: pointer;margin-left:3px;" class="el-icon-chat-dot-square"></span>
                <span style="margin-left:3px;">{{question.answerCount}}</span>
              </span>
              <span class="questionWatch">
                <span style="cursor: pointer;"><router-link :to="'/question/getQuestion?id='+question.id">查看</router-link></span>
                <span style="cursor: pointer;margin-left:3px;" class="el-icon-view"></span>
                <span style="margin-left:3px;">5</span>
              </span>
            </div>
            <div class="questionInfo">
              <el-tag size="small">分类</el-tag>
              <el-tag type="success" size="small">{{question.grade}}</el-tag>
              <el-tag type="info" size="small">{{question.subject}}</el-tag>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最多讨论" name="answer">
          <el-empty :image-size="200" description="暂无此类型题目" v-if="questionItems.total===0"></el-empty>
          <div class="questionItem" v-for="(question) in questionItems.list" :key="question.id">
            <div class="questionTitle">
              <router-link :to="`/question/getQuestion?id=${question.id}`">{{question.title}}</router-link>
            </div>
            <div class="questionLabel">
              <span class="questionSorts">类型:<span>{{question.typeName}}</span></span>
              <span class="questionDegree">
                <span>难度：</span><el-rate v-model="question.degree" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
              </span>
            </div>
            <div class="questionContent">
              <span class="questionCollect">
                <span>收藏</span>
                <span style="margin-left:3px;font-size: 16px;color: gold;" class="el-icon-star-on"></span>
                <span style="margin-left:3px;">{{question.collectCount}}</span>
              </span>
              <span class="questionChat">
                <span style="cursor: pointer;"><router-link style="color: #9c9999;text-decoration: none" :to="'/question/getQuestion?id='+question.id">讨论</router-link></span>
                <span style="cursor: pointer;margin-left:3px;" class="el-icon-chat-dot-square"></span>
                <span style="margin-left:3px;">{{question.answerCount}}</span>
              </span>
              <span class="questionWatch">
                <span style="cursor: pointer;"><router-link :to="'/question/getQuestion?id='+question.id">查看</router-link></span>
                <span style="cursor: pointer;margin-left:3px;" class="el-icon-view"></span>
                <span style="margin-left:3px;">5</span>
              </span>
            </div>
            <div class="questionInfo">
              <el-tag size="small">分类</el-tag>
              <el-tag type="success" size="small">{{question.grade}}</el-tag>
              <el-tag type="info" size="small">{{question.subject}}</el-tag>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="pageHelper clearFloat">
      <PageHelper v-if="questionItems.total!==0" ref="pageHelper" v-bind:page-size="questionItems.pageSize" v-bind:total="total"></PageHelper>
    </div>
  </div>
</template>

<script>
import PageHelper from "@/components/PageHelper/PageHelper.vue";
import {mapGetters, mapState} from "vuex";
import ChooseBtn from "@/pages/Question/Common/ChooseBtn/ChooseBtn.vue";

export default {
  name: "ListQuestion",
  components: {ChooseBtn, PageHelper},
  mounted() {
    this.$bus.$on('getGradeIdAndSubjectId',(subjectId,gradeId)=>{
      this.subjectIds=[subjectId]
      this.gradeIds=[gradeId]
    })
    this.$store.dispatch("getAllQuestion",{pageNum:1,pageSize: 10,sortType: this.sortType,title:'',subjectIds:null,gradeIds:null,types:null,degrees:null})
  },
  beforeDestroy() {
    this.$bus.$off('getGradeIdAndSubjectId')
  },
  updated() {
    for (let i = 0; i < document.getElementsByClassName("el-tabs__item").length; i++) {
      document.getElementsByClassName("el-tabs__item")[i].setAttribute('style','color: #9d9d9d')
    }
  },
  watch:{
    sortType:{
      immediate: false,
      handler(newValue,oldVaue){
        this.$bus.$emit('getSortType',newValue)
      }
    }
  },
  computed: {
    ...mapState({
      questionItems: state => state.Question.questionItems,
    }),
    ...mapGetters(['total'])
  },
  data(){
    return {
      value: 4.8,
      isCollect: true,
      sortType: 'time',
      subjectIds: undefined,
      gradeIds: undefined
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$refs.pageHelper.current_page=1
      this.$store.dispatch("getAllQuestion",{pageNum:1,pageSize: 10,sortType: this.sortType,title:'',subjectIds:null,gradeIds:null,types:null,degrees:null})
    },
    handleCurrentChange(val){
      this.$store.dispatch("getAllQuestion",{pageNum:val,pageSize: this.questionItems.pageSize,sortType: this.sortType,title:'',subjectIds:null,gradeIds:null,types:null,degrees:null})
    }
  }
}
</script>

<style scoped lang="less">
@import "public/common";

.el-rate {
  display: inline-block;
}

#listQuestion {
  color: #9d9d9d;

  & > * {
    border-radius: @border-radius-all;
    box-shadow: @box-shadow-all;
  }

  #questionBox {
    background-color: white;
    padding: 5px 15px;

    .questionItem {
      padding-top: 10px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f4f4f4;
      text-align: left;

      & > * {
        margin-top: 5px;
        font-size: 14px;
      }

      .questionTitle {
        color: #3c3c3c;
        font-size: 18px;
        font-weight: 700;

        a {
          text-decoration: none;
          color: #3c3c3c;
          transition: @transition-all;
        }

        a:hover {
          color: cornflowerblue!important;
        }
      }
      .questionLabel {

        & > *{
          margin-right: 10px;
        }

        & > *:after {
          content: "|";
          color: #9c9999;
          padding-left: 5px;
        }

      }
      .questionContent {

        & > * {
          margin-right: 20px;
        }

        .questionWatch {

          span {
            a {
              text-decoration: none;
              color: #9d9d9d;
              transition: @transition-all;
            }

            a:hover {
              color: cornflowerblue!important;
            }
          }
        }
      }
      .questionInfo {

        & > * {
          margin-right: 20px;
        }
      }
    }
  }

  .pageHelper {
    margin-top: 10px;
    display: inline-block;
    float: left;

  }
}
</style>