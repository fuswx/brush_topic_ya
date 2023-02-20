<template>
  <div>
    <router-view id="contents"></router-view>
  </div>
</template>

<script>
export default {
  name: "Content"
}
</script>

<style scoped lang="less">
#contents {
  padding: 15px 30px 15px 30px;
  box-sizing: border-box;
  width: 100%;
}
</style>