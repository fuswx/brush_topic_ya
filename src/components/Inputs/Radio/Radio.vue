<template>
  <div>
    <!--  题目标题  -->
    <Title @getTitle="getTitle" v-bind:index="index" v-bind:title="title" v-bind:isStatus="isStatus"></Title>

    <el-radio-group v-model="initAnswer[0]" v-if="isStatus==='show'||isStatus==='create'">
      <Single v-bind:items="items" v-bind:isStatus="isStatus"></Single>
    </el-radio-group>

    <el-radio-group id="inputBox" v-model="initAnswer[0]" v-if="isStatus==='list'">
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
  props:['datas','isStatus','index'],
  data(){
    return {
      initAnswer: ['选项一'],
      title: this.datas===undefined?'':this.datas.title,
      items: this.datas===undefined?['选项一','选项二']:this.datas.items,
      itemCount: this.datas===undefined?2:this.datas.items.length,
    }
  },
  methods:{
    addComponent(){
      this.itemCount++
      this.items.push('选项'+this.itemCount)
    },
    subComponent(){
      if (--this.itemCount<=0){
        this.$parent.componentsName.splice(this.index,1)
      }else {
        this.items.pop()
      }
    },
    getTitle(newTitle){
      this.title=newTitle
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