<template>
  <div>
    <!--  题目标题  -->
    <Title @getTitle="getTitle" v-bind:index="index" v-bind:title="content" v-bind:isStatus="isStatus"></Title>

    <el-radio-group v-model="initAnswer[0]" v-if="isStatus==='show'||isStatus==='create'">
      <Single v-bind:items="items" v-bind:isStatus="isStatus"></Single>
    </el-radio-group>

    <el-radio-group id="inputBox" v-model="initAnswer[0]" v-if="isStatus==='get'||isStatus==='list'">
      <Single v-bind:items="items" v-bind:isStatus="isStatus"></Single>
    </el-radio-group>

    <UpdateButton v-if="isStatus==='create'"></UpdateButton>
  </div>
</template>

<script>
import Title from "@/components/Inputs/Utils/Title/Title.vue";
import UpdateButton from "@/components/Inputs/Utils/UpdateButton/UpdateButton.vue";
import Single from "@/components/Inputs/Radio/Single/Single.vue";

export default {
  name: "Radio",
  components: {Single, UpdateButton, Title},
  props:['question','isStatus','index'],
  data(){
    return {
      initAnswer: ['选项一'],
      content: this.question===undefined?'':this.question.content,
      items: this.question===undefined?['选项一','选项二']:this.question.items,
      itemCount: this.question===undefined?2:this.question.items.length,
    }
  },
  methods:{
    addComponent(){
      this.itemCount++
      this.items.push('选项'+this.itemCount)
    },
    subComponent(){
      if (--this.itemCount<=0){
        this.$parent.subComponent(this.index)
      }else {
        this.items.pop()
      }
    },
    getTitle(newTitle){
      this.content=newTitle
    }
  }
}
</script>

<style lang="less">
@import "public/inputsCommon";

.questionTextDiv {
  text-align: center;
  margin-bottom: 20px;

  #questionText {
    display: block;
    width: 50%;
    height: 30px;
    cursor: text;
    border: solid 0px cornflowerblue;
    background-color: rgba(255,255,255,0);
    text-align: left;
    margin-left: 0px;
    outline: none;
    font-size: 20px;
  }
}


</style>