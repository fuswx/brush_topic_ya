<template>
  <el-row>
    <el-button type="primary" size="small" @click="addComponent">增加</el-button>
    <DeleteButton></DeleteButton>
  </el-row>
</template>

<script>
import DeleteButton from "@/components/Inputs/Utils/UpdateButton/DeleteButton/DeleteButton.vue";

export default {
  name: "UpdateButton",
  components: {DeleteButton},
  methods:{
    addComponent(){
      this.$parent.addComponent()
    },
    subComponent(){
      this.$parent.subComponent()
    }
  }
}
</script>

<style scoped lang="less">
.el-row {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>