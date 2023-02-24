<template>
<div>
  <div v-if="isStatus==='create'||isStatus==='show'">
    <el-radio :label="item" v-for="(item,index) in items" :key="index">
      <input v-model="items[index]" class="itemsName" :placeholder="items[index]">
    </el-radio>
  </div>
  <div id="outBox" v-if="isStatus==='list'">
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

<style scoped lang="less">
#outBox {
  display: flex;

  .el-radio {
    flex: 1;
    margin-right: 0;
    margin-bottom: 10px;
  }
}
</style>