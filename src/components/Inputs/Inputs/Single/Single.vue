<template>
<div>
  <div v-if="isStatus==='create'||isStatus==='show'||isStatus==='list'">
    <el-input v-for="(data,index) in items" :key="index"
              placeholder="请输入内容"
              v-model="items[index]"
              clearable>
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