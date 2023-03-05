<template>
  <el-button type="danger" size="small" @click="open">删除</el-button>
</template>

<script>
export default {
  name: "DeleteButton",
  methods: {
    open() {
      this.$confirm('确认删除此选项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.subComponent()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    subComponent(){
      this.$parent.$parent.subComponent()
      return "删除成功";
    }
  }
}
</script>

<style scoped>

</style>