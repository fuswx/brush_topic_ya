<template>
<div>
  <div>
    <el-input placeholder="请输入内容" v-model="items[index]" clearable
              v-for="(item,index) in items" :key="index">
    </el-input>
  </div>
</div>
</template>

<script>
export default {
  name: "Single",
  props: ['items','isStatus'],
}
</script>

<style scoped>

</style>