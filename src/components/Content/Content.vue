<template>
  <div id="content">
    <BreadCrumb v-bind:bread-crumbs="[{name:'表单预览'}]"></BreadCrumb>
    <router-view></router-view>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";

export default {
  name: "Content",
  components: {BreadCrumb},
}
</script>

<style scoped lang="less">
@import "public/common";

#content {
  float: right;
  width: calc(~"(100% - @{sliderWidth})");
  transition: @transition-all;
  margin-top: 0;
  background-color: #f4f4f4;
  min-height: calc(90vh);
  padding: 10px 30px 15px 30px;
  box-sizing: border-box;
}
</style>