<template>
  <div>
    <Title @getTitle="getTitle" v-bind:index="index" v-bind:title="content" v-bind:isStatus="isStatus"></Title>

    <Single v-bind:items="items"></Single>

    <UpdateButton v-if="isStatus==='create'"></UpdateButton>
  </div>
</template>

<script>
import Title from "@/components/Inputs/Utils/Title/Title.vue";
import UpdateButton from "@/components/Inputs/Utils/UpdateButton/UpdateButton.vue";
import Single from "@/components/Inputs/Inputs/Single/Single.vue";

export default {
  name: "Inputs",
  components: {Single, UpdateButton, Title},
  props:['question','isStatus','index'],
  data(){
    return {
      initAnswer: [],
      items: this.question===undefined?['','']:this.question.items,
      content: this.question===undefined?'':this.question.content,
      itemCount: this.question===undefined?2:this.question.items.length,
    }
  },
  methods:{
    addComponent(){
      this.itemCount++
      this.items.push('')
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

.el-input {
  margin-bottom: 10px;
}
</style>