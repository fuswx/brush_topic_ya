<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{path: breadCrumbs.path}" v-for="(breadCrumb,index) in breadCrumbs" :key="index">{{breadCrumb.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",
  props: ['breadCrumbs']
}
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
}
</style>