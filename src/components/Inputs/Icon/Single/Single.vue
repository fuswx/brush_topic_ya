<template>
<div>
  <div>
    <el-input v-for="(item,index) in items" :key="index"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="items[index]">
    </el-input>
  </div>
</div>
</template>

<script>
export default {
  name: "Single",
  props: ['items','isStatus']
}
</script>

<style scoped>

</style>