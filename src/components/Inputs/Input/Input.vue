<template>
  <div>
    <!--  题目标题  -->
    <Title @getTitle="getTitle" v-bind:title="title" v-bind:isStatus="isStatus"></Title>

    <Single v-bind:items="items" v-bind:is-status="isStatus"></Single>

    <UpdateButton v-if="isStatus==='create'"></UpdateButton>
  </div>
</template>

<script>
import Title from "@/components/Inputs/Utils/Title/Title.vue";
import UpdateButton from "@/components/Inputs/Utils/UpdateButton/UpdateButton.vue";
import Single from "@/components/Inputs/Input/Single/Single.vue";

export default {
  name: "Input",
  components: {Single, UpdateButton, Title},
  props:['datas','isStatus'],
  data(){
    return {
      items: this.datas===undefined?['']:this.datas.items,
      title: this.datas===undefined?'':this.datas.title,
      itemCount: this.datas===undefined?0:this.datas.items.length,
    }
  },
  methods:{
    addComponent(){
      this.itemCount++
      this.items.push('')
    },
    subComponent(){
      if (--this.itemCount<=0){
        this.$el.parentNode.removeChild(this.$el)
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
</style>