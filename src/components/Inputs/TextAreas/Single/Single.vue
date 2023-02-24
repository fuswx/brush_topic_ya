<template>
<div>
  <div v-if="isStatus==='create'||isStatus==='show'||isStatus==='list'">
    <el-input v-for="(item,index) in items" :key="index"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              :autosize="{ minRows: 3, maxRows: 4}"
              v-model="items[index]">
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