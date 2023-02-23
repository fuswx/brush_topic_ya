<template>
  <div class="questionTextDiv">
    <el-input type="textarea" v-if="isStatus==='show'||isStatus==='create'"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="题目问题"
              v-model="newTitle">
    </el-input>
    <span v-if="isStatus==='list'">{{title}}</span>
  </div>
</template>

<script>
export default {
  name: "Title",
  props: ['title','isStatus'],
  data(){
    return {
      newTitle: this.title
    }
  },
  watch:{
    newTitle(newTitle,oldTitle){
      this.$emit('getTitle',newTitle)
    }
  }
}
</script>

<style scoped>

</style>