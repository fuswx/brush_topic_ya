<template>
  <div>
    <div v-if="isStatus==='create'||isStatus==='show'">
      <el-checkbox border v-for="(item,index) in items" :label="item" :key="index">
        <input class="itemsName" v-model="items[index]" :placeholder="item">
      </el-checkbox>
    </div>

    <div id="outBox" v-if="isStatus==='list'||isStatus==='get'">
      <el-checkbox border v-model="items[index]"
                   v-for="(item,index) in items"
                   :label="item" :key="index">
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
#outBox {
  display: block;
  text-align: left;

  .el-checkbox {
    width: 200px;
    margin-bottom: 10px;
    margin-right: 20px;
    display: block;

    &:not(:first-child){
      margin-left: 0;
    }
  }
}

</style>