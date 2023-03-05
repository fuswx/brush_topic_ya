<template>
  <div class="discussItem" v-if="userAnswerInfo!==null">
    <UserItem v-bind:user-answer-info="userAnswerInfo"></UserItem>

    <transition enter-active-class="animate__animated animate__bounceInLeft"
    leave-active-class="animate__animated animate__bounceOutLeft">
      <div class="addComment" v-if="addIsShow&&addCommentItems.total>0" v-loading="loading">
        <UserItem v-if="userAddComment" v-bind:user-answer-info="userAddComment"></UserItem>
        <UserItem v-for="(addComment) in addCommentItems.list" :key="addComment.id" v-bind:user-answer-info="addComment" v-loading="loading"></UserItem>

        <div class="pageHelper clearFloat">
          <PageHelper v-bind:isSmall="true" v-bind:page-size="addCommentItems.pageSize" v-bind:total="addCommentItems.total"></PageHelper>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

import UserItem from "@/components/User/UserAnswer/UserItem.vue";
import PageHelper from "@/components/PageHelper/PageHelper.vue";
import {mapState} from "vuex";

export default {
  name: "UserAnswer",
  components: {PageHelper, UserItem},
  props: ['userAnswerInfo'],
  computed:{
    ...mapState({
      addCommentItems: state => state.Question.addCommentItems,
      userAddComment: state => state.Question.userAddComment
    })
  },
  data(){
    return {
      addIsShow: false,
      loading: true
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleCurrentChange(val){
      this.$store.dispatch("getAddCommentByQuestionId",{pageNum:val,pageSize: this.addCommentItems.pageSize,commentId: this.userAnswerInfo.id,userId: this.userAnswerInfo.userId})
    }
  }
}
</script>

<style scoped lang="less">

.discussItem {
  margin-top: 5px;
  padding: 5px 5px 20px 5px;
  border-bottom: 2px solid #f4f4f4;
  transition: all linear 1s;

  .addComment {
    padding: 0 40px;
  }
}
</style>