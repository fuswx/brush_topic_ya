<template>
  <div>
    <div class="questionTextDiv" v-if="isStatus==='show'||isStatus==='create'">
      <el-input type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="题目问题"
                v-model="newTitle">
      </el-input>
    </div>
    <div class="inputTitleLit" v-if="isStatus==='list'">
      <span>{{index+1+'.'+title}}</span>
    </div>
  </div>

</template>

<script>
export default {
  name: "Title",
  props: ['title','isStatus','index'],
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

<style scoped lang="less">
.inputTitleLit {
  display: block;
  text-align: left;
  margin-bottom: 20px;

  span {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>