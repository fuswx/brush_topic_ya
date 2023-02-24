<template>
  <div>
    <!--  题目标题  -->
    <Title @getTitle="getTitle" v-bind:index="index" v-bind:title="title" v-bind:isStatus="isStatus"></Title>

    <el-checkbox-group v-model="initAnswer" @change="handleCheckedOptionsChange">
      <Single v-bind:items="items" v-bind:isStatus="isStatus"></Single>
    </el-checkbox-group>

    <UpdateButton v-if="isStatus==='create'"></UpdateButton>
  </div>
</template>

<script>
import Title from "@/components/Inputs/Utils/Title/Title.vue";
import UpdateButton from "@/components/Inputs/Utils/UpdateButton/UpdateButton.vue";
import Single from "@/components/Inputs/CheckBox/Single/Single.vue";

export default {
  name: "CheckBox",
  components: {Single, UpdateButton, Title},
  props:['datas','isStatus','index'],
  data(){
    return {
      initAnswer: ['选项1'],
      itemCount: this.datas===undefined?2:this.datas.items.length,
      isIndeterminate: true,
      title: this.datas===undefined?'':this.datas.title,
      // items: this.datas===undefined?[{value:'选项一',name:'选项一'},{value:'选项二',name:'选项二'}]:this.datas
      items: this.datas===undefined?['选项1','选项2']:this.datas.items
    }
  },
  methods:{
    handleCheckedOptionsChange(value) {
      let checkedCount = value.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length;
    },
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
</style>