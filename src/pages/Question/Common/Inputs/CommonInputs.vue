<template>
<div>
  <!--题目标题-->
  <el-input v-if="type" placeholder="请输入标题" v-model="title" clearable></el-input>
  <transition
      enter-active-class="animate__animated animate__bounceIn">
    <component ref="component"
               v-bind:isStatus="'create'"
               v-bind:datas="question===undefined?undefined:question"
               :is="type">
    </component>
  </transition>

  <div class="itemOutBox" v-if="type">
    <span class="itemTitle" style="margin-bottom: 5px">详细解析：</span>
    <el-input v-if="type"
              size="mini"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 8}"
              placeholder="请输入题目解析"
              v-model="answer">
    </el-input>
  </div>
  <div class="itemOutBox" v-if="type">
    <span class="itemTitle">科目：</span>
    <span class="itemSelect">
      <el-select style="width: 150px" v-model="subjectId" clearable size="mini" placeholder="请选择科目">
      <el-option
          v-for="item in subjectList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    </span>
  </div>
  <div class="itemOutBox" v-if="type">
    <span class="itemTitle">年级：</span>
    <span class="itemSelect">
      <el-select style="width: 150px" v-model="gradeId" clearable size="mini" placeholder="请选择年级">
      <el-option
          v-for="item in gradeList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    </span>
  </div>
  <div class="itemOutBox" v-if="type">
    <span class="itemTitle">难度：</span>
    <span class="itemSelect">
      <el-input
          style="width: 150px"
          size="mini"
          placeholder="难度范围在0.0-5.0"
          v-model="degree"
          min="0.0"
          max="5.0"
          clearable>
      </el-input>
    </span>
  </div>
</div>
</template>

<script>
import TextAreas from "@/pages/Question/Common/Inputs/TextAreas/TextAreas.vue";
import Icon from "@/pages/Question/Common/Inputs/Icon/Icon.vue";
import Inputs from "@/pages/Question/Common/Inputs/Inputs/Inputs.vue";
import Input from "@/pages/Question/Common/Inputs/Input/Input.vue";
import Select from "@/pages/Question/Common/Inputs/Select/Select.vue";
import CheckBox from "@/pages/Question/Common/Inputs/CheckBox/CheckBox.vue";
import Radio from "@/pages/Question/Common/Inputs/Radio/Radio.vue";
import {mapState} from "vuex";

export default {
  name: "CommonInputs",
  props: ['type','isStatus','question'],
  components: {TextAreas, Icon, Inputs, Input, Select, CheckBox, Radio},
  mounted() {
    this.$store.dispatch("getGradeList")
  },
  computed:{
    ...mapState({
      subjectList: state => state.Slider.subjectList,
      gradeList: state => state.Slider.gradeList,
      sortGradeList: state => state.Slider.sortGradeList
    })
  },
  data(){
    return {
      title: this.question===undefined?undefined:this.question.title,
      answer: this.question===undefined?undefined:this.question.answer,
      subjectId: undefined,
      gradeId: undefined,
      categoryId: undefined,
      degree: undefined,
    }
  }
}
</script>

<style scoped lang="less">
.itemOutBox {
  text-align: left;
  margin-bottom: 10px;

  .itemTitle {
    display: inline-block;
    font-weight: 700;
    font-size: 14px;
    color: cornflowerblue;
  }
  .itemSelect {
    display: inline-block;
    width: 60%;
  }
}
</style>