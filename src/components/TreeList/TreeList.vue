<template>
  <el-col id="slider" :span="12">
    <el-menu unique-opened default-active="2" class="el-menu-vertical-demo">
      <!--树表格-->
      <el-submenu :index="index+''" v-for="(ele,index) in datas" :key="ele.data.value">
        <template slot="title">
          <div class="innerBox">
            <i :class="iconClass[index]"></i>
            <span>{{ele.title}}</span>
          </div>
        </template>
        <el-tree accordion :data="ele.data" :props="defaultProps">
          <div class="el-tree-node" slot-scope="{ node, data }" @click="clickMethod(data.value,data)" @mouseenter="enterMethod(data.value)" @mouseleave="leaveMethod">
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
      iconClass: ['el-icon-mobile','el-icon-scissors',
        'el-icon-umbrella','el-icon-headset',
        'el-icon-brush','el-icon-mouse','el-icon-coordinate',
        'el-icon-magic-stick','el-icon-reading','el-icon-data-line'],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  methods:{
    enterMethod(value){
      this.$parent.enterMethod(value-1)
    },
    leaveMethod(){
      this.$parent.leaveMethod()
    },
    clickMethod(value,data){
      this.$parent.clickMethod(value-1,data)
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