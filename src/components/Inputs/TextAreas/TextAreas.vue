<template>
<div>
  <Title @getTitle="getTitle" v-bind:index="index" v-bind:title="title" v-bind:isStatus="isStatus"></Title>

  <Single v-bind:items="items" v-bind:isStatus="isStatus"></Single>

  <UpdateButton v-if="isStatus==='create'"></UpdateButton>
</div>
</template>

<script>
import Title from "@/components/Inputs/Utils/Title/Title.vue";
import UpdateButton from "@/components/Inputs/Utils/UpdateButton/UpdateButton.vue";
import Single from "@/components/Inputs/TextAreas/Single/Single.vue";

export default {
  name: "TextAreas",
  components: {Single, UpdateButton, Title},
  props:['datas','isStatus','index'],
  data() {
    return {
      initAnswer: [],
      items: this.datas===undefined?['']:this.datas.items,
      title: this.datas===undefined?'':this.datas.title,
      itemCount: this.datas===undefined?1:this.datas.items.length,
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
      this.title=newTitle
    }
  }
}
</script>

<style lang="less">
@import "public/inputsCommon";
.el-textarea {
  margin-bottom: 10px;
}
</style>