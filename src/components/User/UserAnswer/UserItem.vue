<template>
  <div>
    <div class="discussUser">
      <span class="discussUserImg"><img alt="discussUserImg" src="./img/user.jpg"></span>
      <span class="discussUserState">
        <span>{{userAnswerInfo.userName}} <span style="color: cornflowerblue" v-if="userAnswerInfo.userId===1">(我)</span></span>
        <span>{{uploadTime}}</span>
      </span>
      <span class="discussUserOption" v-if="userAnswerInfo.isAnswer">
        <span @click="askBtnClick">修改</span>
        <span @click="deleteAsk">删除</span>
      </span>
    </div>
    <div class="discussUserContent">
      <div class="discussUserContentText">{{userAnswerInfo.content}}</div>
      <div class="discussUserContentBtn">
        <span style="cursor: pointer;font-weight: 600;font-size: 12px;color: cornflowerblue;">
          <span style="font-size: 18px" class="el-icon-thumb"></span>
          <span>{{userAnswerInfo.topCount}}</span>
        </span>
        <span style="cursor: pointer;font-weight: 600;font-size: 12px;color: cornflowerblue;">
          <span style="font-size: 18px" class="el-icon-bottom"></span>
          <span>{{userAnswerInfo.stepCount}}</span>
        </span>
        <span style="cursor: pointer;font-weight: 600;font-size: 12px;color: cornflowerblue;" @click="showAddComment">
          <span style="font-size: 18px" class="el-icon-chat-dot-square"></span>
          <span>{{userAnswerInfo.addCount}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserItem",
  props: ['userAnswerInfo'],
  data(){
    return {
      uploadTime: null
    }
  },
  mounted() {
    //格式化时间格式
    this.uploadTime=this.timeStampString(this.userAnswerInfo.commentTime)
  },
  methods:{
    askBtnClick(){
      this.$parent.$parent.askBtnClick()
    },
    deleteAsk(){
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$parent.$parent.isAnswer=false
        this.$parent.$parent.answerCount--
        this.$parent.$parent.answerContent=""
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消删除'
        });
      });
    },
    showAddComment(){
      this.$store.dispatch("getAddCommentByQuestionId",{pageNum:1,pageSize: 5,commentId: this.userAnswerInfo.id,userId: 1})
      this.$store.dispatch("getAddCommentByQuestionIdAndUserId",{commentId: this.userAnswerInfo.id,userId: 1})
      this.$parent.addIsShow=!this.$parent.addIsShow
      this.$parent.loading=false
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: '加载中。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
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
.discussUser {
  position: relative;
  height: 50px;
  margin-bottom: 10px;

  & > * {
    height: 50px;
  }

  .discussUserImg {
    display: inline-block;
    width: 50px;

    img {
      width: 50px;
      height: 50px;
    }
  }

  .discussUserState {
    display: inline-block;
    position: absolute;
    margin-left: 10px;
    top: 0;

    & > * {
      display: block;
      margin-top: 10px;
    }

    span {
      &:first-child {
        font-size: 12px;
        font-weight: 600;
      }

      &:last-child {
        font-size: 12px;
        font-weight: 400;
        color: #9d9d9d;
      }
    }

  }

  .discussUserOption {
    float: right;
    font-size: 12px;
    font-weight: 400;
    color: #9d9d9d;

    span {
      cursor: pointer;
      margin-right: 10px;
    }
  }
}

.discussUserContent {
  padding: 5px;

  .discussUserContentText {
    color: #3c3c3c;
    font-size: 12px;
    font-weight: 600;
  }

  .discussUserContentBtn {
    margin-top: 10px;
    position: relative;
    text-align: right;
    right: 0;

    & > * {
      margin-right: 10px;
    }
  }
}
</style>