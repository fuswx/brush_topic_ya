<template>
<div>
  <div v-if="isStatus==='create'||isStatus==='show'">
    <el-radio :label="item" v-for="(item,index) in items" :key="index">
      <input v-model="items[index]" class="itemsName" :placeholder="items[index]">
    </el-radio>
  </div>
  <div v-if="isStatus==='list'">
    <el-radio :label="item" v-for="(item,index) in items" :key="index"></el-radio>
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
.el-radio {
  margin-right: 0;
  margin-bottom: 10px;
}
</style>