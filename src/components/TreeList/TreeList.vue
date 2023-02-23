<template>
  <el-col id="slider" :span="12">
    <el-menu default-active="2" class="el-menu-vertical-demo">
      <!--树表格-->
      <el-submenu :index="index+''" v-for="(ele,index) in datas" :key="ele.data.inputId">
        <template slot="title">
          <div class="innerBox">
            <i class="el-icon-location"></i>
            <span>{{ele.title}}</span>
          </div>
        </template>
        <el-tree :data="ele.data" :props="defaultProps">
          <div class="el-tree-node" slot-scope="{ node, data }" @click="clickMethod(data.inputId)" @mouseenter="enterMethod(data.inputId)" @mouseleave="leaveMethod">
            <div class="el-tree-node__content option">
                  <span class="custom-tree-node">
                    <span>
                      <span class="vertical-align" style="margin-left:10px;text-align: left;width: 105px;display: inline-block;">{{ node.label}}</span>
<!--                      <span class="vertical-align" style="text-align: right;">{{data.inputId}}</span>-->
                    </span>
                  </span>
            </div>
          </div>
        </el-tree>
      </el-submenu>
      <!--树表格/-->
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "TreeList",
  props: ['datas'],
  data(){
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  methods:{
    enterMethod(inputId){
      this.$parent.enterMethod(inputId-1)
    },
    leaveMethod(){
      this.$parent.leaveMethod()
    },
    clickMethod(inputId){
      this.$parent.clickMethod(inputId-1)
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.innerBox {
  padding-left: 0;
  text-align: left;
}
</style>