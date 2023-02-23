<template>
  <div>
    <div v-if="isStatus==='create'||isStatus==='show'">
      <el-checkbox border v-for="(item,index) in items" :label="item" :key="index">
        <input class="itemsName" v-model="items[index]" :placeholder="item">
      </el-checkbox>
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
.el-checkbox {
  margin-bottom: 10px;
  margin-right: 0;
}
</style>