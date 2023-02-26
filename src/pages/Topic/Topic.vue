<template>
<div id="topic">
  <router-view></router-view>
</div>
</template>

<script>

export default {
  name: "Topic",
}
</script>

<style scoped lang="less">
#topic {

  &::after {
    content: '';
    /*建议加个height:0*/
    height: 0;
    display: block;
    clear: both;
    visibility: hidden;
  }
}
</style>