<template>
  <div id="right-box">

    <div id="title-div">
      <span id="title">{{form.title}}</span>
    </div>

    <div id="right-box-content">

      <component ref="component"
                 v-bind:isStatus="'list'"
                 v-bind:datas="form.components[index]"
                 v-bind:index="index"
                 v-for="(component,index) in componentsName"
                 :key="index" :is="component.name">
      </component>

      <el-row style="border-top: solid 2px rgba(230,230,230,0.6);padding-top: 10px">
        <el-button type="primary" plain @click="open">我要提交</el-button>
      </el-row>
    </div>

  </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import TextAreas from "@/components/Inputs/TextAreas/TextAreas.vue";
import Icon from "@/components/Inputs/Icon/Icon.vue";
import Inputs from "@/components/Inputs/Inputs/Inputs.vue";
import Input from "@/components/Inputs/Input/Input.vue";
import Select from "@/components/Inputs/Select/Select.vue";
import CheckBox from "@/components/Inputs/CheckBox/CheckBox.vue";
import Radio from "@/components/Inputs/Radio/Radio.vue";
import TreeList from "@/components/TreeList/TreeList.vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";

export default {
  name: "GetTopic",
  components: {BreadCrumb, TextAreas, Icon, Inputs, Input, Select, CheckBox, Radio, TreeList},
  computed: {
    ...mapState({
      form: state => state.GetTopic.form
    }),
    ...mapGetters(['componentsName'])
  },
  mounted() {
    this.$store.dispatch("getTopicFrom",this.$route.query.formId)
  },
  methods:{
    submitQuestionnaire(){},
    open() {
      this.$confirm('确认提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitQuestionnaire();
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '提交失败'
        });
      });
    },
  }
}
</script>

<style scoped lang="less">
@import "public/definition";

.el-button {
  transition: @transition-all;
  font-size: 14px;
  font-weight: 700;
}
#left-box,
#right-box {
  float: left;
}

#left-box {
  width: @sliderWidth;
}
#right-box {
  background-color: white;
  width: 100%;
  float: right;
  border-radius: @border-radius-all;
  box-shadow: @box-shadow-all;
}
#right-box-content {

  div {
    margin-bottom: 20px;
    padding-left: 5%;
    padding-right: 5%;
  }
}
#title-div {
  width: 100%;
  background-color: white;
  margin-top: 20px;
}
#title {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 40px;
  font-size: 35px;
  font-weight: 700;
  line-height: 40px;
  color: cornflowerblue;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

</style>