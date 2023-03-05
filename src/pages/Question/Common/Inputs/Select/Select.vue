<template>
  <div>
    <Title @getTitle="getTitle" v-bind:index="index" v-bind:title="content" v-bind:isStatus="isStatus"></Title>

    <el-select v-if="isStatus==='create'||isStatus==='show'" v-model="initAnswer[0]" clearable placeholder="请选择">
      <Single v-bind:items="items" v-bind:isStatus="isStatus"></Single>
    </el-select>
    <div v-if="isStatus==='create'">
      <el-input placeholder="请输入内容" v-model="items[index]" clearable
                v-for="(item,index) in items" :key="index">
      </el-input>
    </div>

    <el-select v-if="isStatus==='list'||isStatus==='get'" v-model="initAnswer[0]" clearable placeholder="请选择">
      <Single v-bind:items="items" v-bind:isStatus="isStatus"></Single>
    </el-select>

    <UpdateButton v-if="isStatus==='create'"></UpdateButton>
  </div>
</template>

<script>
import Title from "@/components/Inputs/Utils/Title/Title.vue";
import UpdateButton from "@/components/Inputs/Utils/UpdateButton/UpdateButton.vue";
import Single from "@/components/Inputs/Select/Single/Single.vue";

export default {
  name: "Select",
  components: {Single, UpdateButton, Title},
  props:['question','isStatus','index'],
  data(){
    return {
      initAnswer: [''],
      items: this.question===undefined?['选项1','选项2','选项3']:this.question.items,
      content: this.question===undefined?'':this.question.content,
      itemCount: this.question===undefined?3:this.question.items.length,
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
.el-select {
  text-align: left;
  left: 0;
  display: block!important;
  width: 40%;
}
</style>