<template>
<div>
  <div v-if="isStatus==='create'||isStatus==='show'">
    <el-option v-for="(item,index) in items" :key="item" :label="item" :value="item">
      <input class="itemsName" v-model="items[index]" :placeholder="item">
    </el-option>
  </div>

  <div v-if="isStatus==='list'">
    <el-option v-for="(item,index) in items" v-model="items[index]" :key="item" :label="item" :value="item">
    </el-option>
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

</style>