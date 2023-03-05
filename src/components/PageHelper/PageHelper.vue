<template>
  <div>
    <el-pagination v-if="!isSmall"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="current_page"
        :total="total">
    </el-pagination>
    <el-pagination v-if="isSmall"
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="pageSize"
        :current-page="current_page"
        :total="total"
        small>
    </el-pagination>
  </div>

</template>

<script>

export default {
  name: "PageHelper",
  props: ['total','isSmall','pageSize'],
  data(){
    return {
      current_page: 1,
    }
  },
  methods:{
    handleCurrentChange(val){
      this.current_page=val
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