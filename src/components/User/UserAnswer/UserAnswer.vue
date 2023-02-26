<template>
  <div class="discussItem">
    <div class="discussUser">
      <span class="discussUserImg"><img alt="discussUserImg" src="./img/user.jpg"></span>
      <span class="discussUserState">
        <span>{{userAnswerInfo.name}}</span>
        <span>{{userAnswerInfo.publishTime}}</span>
      </span>
      <span class="discussUserOption" v-if="userAnswerInfo.isAnswer">
        <span @click="askBtnClick">修改</span>
        <span @click="deleteAsk">删除</span>
      </span>
    </div>
    <div class="discussUserContent">{{userAnswerInfo.askContent}}</div>
  </div>
</template>

<script>
export default {
  name: "UserAnswer",
  props: ['userAnswerInfo'],
  methods: {
    askBtnClick(){
      this.$parent.askBtnClick()
    },
    deleteAsk(){
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$parent.isAnswer=false
        this.$parent.answerCount--
        this.$parent.answerContent=""
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
    }
  }
}
</script>

<style scoped lang="less">
.discussItem {
  margin-top: 5px;
  padding: 5px 5px 20px 5px;
  border-bottom: 2px solid #f4f4f4;

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

  .discussUserContent {}

}
</style>