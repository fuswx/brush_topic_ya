<template>
  <div id="getQuestion">
    <div class="questionDetail">
      <div class="questionTitle">{{question.title}}</div>
      <div class="questionLabel">
        <span class="questionSorts">类型:<span>{{question.typeName}}</span></span>
        <span class="questionDegree">
          <span>我的评分：</span>
          <el-rate v-model="value" style="display: inline-block" show-score :colors="colors" text-color="#ff9900" score-template="{value}"></el-rate>
        </span>
        <span class="questionDegree">
          <span>平均评分：</span>
          <el-rate v-model="question.degree" disabled style="display: inline-block" show-score :colors="colors" text-color="#ff9900" score-template="{value}"></el-rate>
        </span>
        <span class="questionCollect">
          <span style="cursor: pointer;" @click="isCollect?question.collectCount--:question.collectCount++;isCollect=!isCollect;">
            <span style="color: #FF9900" v-if="!isCollect">收藏</span>
            <span style="color: #9d9d9d" v-if="isCollect">取消收藏</span>
          </span>
          <span style="cursor: pointer;margin-left:3px;font-size: 16px;color: gold;" @click="isCollect?question.collectCount--:question.collectCount++;isCollect=!isCollect;" :class="isCollect?'el-icon-star-on':'el-icon-star-off'"></span>
          <span style="margin-left:3px;"> {{question.collectCount}}</span>
        </span>
      </div>
      <div class="questionInfo">
        <el-tag @click="this.$router.push('/question/listQuestion')" style="cursor: pointer;" size="small">分类</el-tag>
        <el-tag @click="this.$router.push('/question/listQuestion')" style="cursor: pointer;" type="success" size="small">{{question.grade}}</el-tag>
        <el-tag @click="this.$router.push('/question/listQuestion')" style="cursor: pointer;" type="info" size="small">{{question.subject}}</el-tag>
        <span style="text-align: right;margin-bottom: 5px;float: right;font-size: 12px;font-weight: 400;color: #9d9d9d;">
          <span style="display: block">特别鸣谢：<router-link style="color: cornflowerblue;transition: all 0.5s linear;" :to="'/user/getUser?id='+question.uploadUserId">{{question.uploadUserName}}</router-link></span>
          <span style="display: block">上传时间：<span>{{uploadTime}}</span></span>
        </span>
      </div>
      <div class="questionContent">
        <component :is="question.type" v-bind:isStatus="'get'" v-bind:datas="{title: question.content,items: question.items}"></component>
      </div>
      <div class="questionFunction">
        <el-button @click="hiddenAnswer=!hiddenAnswer" v-if="!hiddenAnswer" size="small" type="success" plain>隐藏解析</el-button>
        <el-button @click="hiddenAnswer=!hiddenAnswer" v-if="hiddenAnswer" size="small" type="primary" plain>显示解析</el-button>
      </div>
      <transition enter-active-class="animate__animated animate__bounceInLeft"
                  leave-active-class="animate__animated animate__bounceOutLeft">
        <div v-if="!hiddenAnswer" class="questionAnswer">
          <span>解析：<span v-for="(initAnswer,index) in question.initAnswer" :key="index">{{initAnswer}} </span></span>
          <span style="display: block;margin-top: 5px" v-html="question.answer"></span>
        </div>
      </transition>
    </div>

    <div class="questionDiscuss">
      <div class="discussNum">
        <span v-if="commentItems.total>0">这里一共有 <span style="color: cornflowerblue">{{question.answerCount}}</span> 条评论喵~</span>
        <span v-else>这里还无人涉足哦，不要让题主太寂寞喵~</span>
        <span style="position: absolute;right: 0;bottom:0;display: inline-block">
          <el-button v-if="commentItems" @click="askBtnClick" size="mini" type="primary" plain><span class="el-icon-chat-dot-square"></span> 我要回答</el-button>
          <el-dialog
              title="不要回答！不要回答！不要回答(dog"
              :visible.sync="dialogVisible"
              width="80%"
              :before-close="handleClose">
            <div style="margin: -20px 0;;padding-bottom: 10px">
<!--              <div style="border: 2px solid #f4f4f4;">工具栏</div>-->
              <div>工具栏</div>
              <div>
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 15,maxRows: 30}"
                    placeholder="       写任何你想说的，例如：[吃瓜]你说的对，但是麤龗灪龖厵爨癵驫麣纞虋讟钃鸜麷鞻韽韾顟顠饙饙騳騱饐龗鱻爩麤灪爨癵籱麣纞钃鸜麷鞻鬰靊飝虪靐齉齾爩鱻爨癵籱饢驫麣纞虋讟钃鸜麷鞻韽韾顟顠饙饙騳騱饐靐齾龗鱻爩麤灪爨癵籱麣纞虋讟钃鸜麷鞻鬰靊讞鑱飝虪齺魕爧蠿齺龘䔍鍝庽龷卉𡗗気䘔亖卐卍l䥲[doge]
       又或者：这个说法是不正确的，因为加缪在创作苹果手机的时候混入了第26个英文字母Z而且归根结底四氯化硅并不能影响venus行星偏移太极中的曼德拉效应进入后花园吃掉植物然后啃食铁血战士的前列腺而引发地磁共振造成散落世界的十三枚水晶颅骨加入大航海，因而得出你充值再多的648也打不过会代数拓扑获得诺贝尔经济学奖的胡柏·布里恩·沃夫斯里积士丁可辛贝格多夫"
                    v-model="answerContent">
                </el-input>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogSubmit">确 定</el-button>
            </span>
          </el-dialog>
        </span>
      </div>
      <div class="discussItems">
        <UserAnswer v-bind:user-answer-info="userComment" v-if="userComment!==undefined"></UserAnswer>
        <UserAnswer v-for="(comment) in commentItems.list" :key="comment.index" v-bind:user-answer-info="comment"></UserAnswer>
      </div>
    </div>

    <div class="pageHelper clearFloat" v-if="commentItems.total>0">
      <PageHelper v-bind:page-size="commentItems.pageSize" v-bind:total="commentItems.total"></PageHelper>
    </div>
  </div>
</template>

<script>
import PageHelper from "@/components/PageHelper/PageHelper.vue";
import UserAnswer from "@/components/User/UserAnswer/UserAnswer.vue";
import {mapState} from "vuex";
import TextAreas from "@/components/Inputs/TextAreas/TextAreas.vue";
import Icon from "@/components/Inputs/Icon/Icon.vue";
import Inputs from "@/components/Inputs/Inputs/Inputs.vue";
import Input from "@/components/Inputs/Input/Input.vue";
import Select from "@/components/Inputs/Select/Select.vue";
import CheckBox from "@/components/Inputs/CheckBox/CheckBox.vue";
import Radio from "@/components/Inputs/Radio/Radio.vue";

export default {
  name: "GetQuestion",
  components: {UserAnswer, PageHelper,TextAreas, Icon, Inputs, Input, Select, CheckBox, Radio},
  mounted() {
    this.$store.dispatch("getQuestionById",this.$route.query.id)
    this.$store.dispatch("getCommentByQuestionId",{pageNum:1,pageSize: 10,questionId: this.$route.query.id,userId: 1})
    this.$store.dispatch("getCommentByQuestionIdAndUserId",{questionId: this.$route.query.id,userId: 1})
  },
  updated() {
    this.uploadTime=this.timeStampString(this.question.uploadTime)
  },

  computed: {
    ...mapState({
      question: state => state.Question.question,
      userComment: state => state.Question.userComment,
      commentItems: state => state.Question.commentItems
    })
  },
  data(){
    return {
      value: null,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      dialogVisible: false,
      hiddenAnswer: true,
      isCollect: false,
      answerContent: "",
      uploadTime: ''
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    askBtnClick(){
      this.dialogVisible=true
      //原生方式为dialog header设置下框
      document.getElementsByClassName("el-dialog__header")[0].setAttribute('style','border-bottom: 2px solid #f4f4f4')
    },
    dialogSubmit(){
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible=false
        this.question.answerCount++
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消提交'
        });
      });
    },
    handleCurrentChange(val){
      this.$store.dispatch("getCommentByQuestionId",{pageNum:val,pageSize: this.commentItems.pageSize,questionId:this.question.id,userId: 1})
    },

    timeStampString(time) {
      var datetime = new Date(time);
      var year = datetime.getFullYear();
      var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      var date = datetime.getDate() < 10? "0" + datetime.getDate() : datetime.getDate();
      return year+"年"+month+"月"+date+"日";
    }
  }
}
</script>

<style scoped lang="less">
@import "public/common";

#getQuestion {
  text-align: left;

  & > * {
    border-radius: @border-radius-all;
    box-shadow: @box-shadow-all;
    transition: @transition-all;
  }

  .questionDetail {
    background-color: white;
    padding: 20px 15px;
    transition: @transition-all;

    & > * {
      margin-top: 10px;
    }

    .questionTitle {
      color: #3c3c3c;
      font-size: 18px;
      font-weight: 700;
      margin-top: 0;
      padding-bottom: 5px;
      border-bottom: 2px solid #f4f4f4;

    }

    .questionLabel {

      & > *{
        margin-right: 10px;
        color: #3c3c3c;
        font-size: 14px;
        font-weight: 700;
      }

      & > *:after {
        content: "|";
        color: #9c9999;
        padding-left: 5px;
      }

    }

    .questionInfo {

      & > * {
        margin-right: 20px;
      }
    }
    .questionContent {
      font-size: 15px;
      font-weight: 500;
      border-bottom: 2px solid #f4f4f4;
      border-top: 2px solid #f4f4f4;
      padding: 10px;

      .questionContentDetail {

        margin-bottom: 10px;
      }

      .questionOption {
        margin-bottom: 5px;
      }
     }

    .questionAnswer {
      font-size: 14px;
      font-weight: 600;
    }


  }

  .questionDiscuss {
    margin-top: 20px;
    background-color: white;
    padding: 20px 15px;

    .discussNum {
      margin-bottom: 10px;
      border-bottom: 3px solid #f4f4f4;
      font-size: 18px;
      font-weight: 700;
      position: relative;

    }

    .discussItems {

    }
  }

  .pageHelper {
    margin-top: 10px;
    display: inline-block;
    float: left;

  }

}


</style>