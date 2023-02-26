<template>
  <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="total">
  </el-pagination>
</template>

<script>

export default {
  name: "PageHelper",
  props: ['total'],
  methods:{
    handleCurrentChange(val){
      this.$parent.handleCurrentChange(val);
    }
  }
}
</script>

<style scoped lang="less">
.el-pagination {
  text-align: left;
  display: inline-block;
  float: left;

}
</style>