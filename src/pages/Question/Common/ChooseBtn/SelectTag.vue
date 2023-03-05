<template>
<div>
  <span class="questionType">
    <el-tag
        :key="tag"
        v-for="tag in dynamicTags"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">{{tag}}</el-tag>
    <el-select
        ref="select"
        @change="handleConfirm"
        v-if="inputVisible" v-model="chooseValue" size="small" :placeholder="'添加'+selectInfo.name">
      <el-option
          v-for="item in selectInfo.items"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled">
      </el-option>
    </el-select>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </span>
</div>
</template>

<script>
export default {
  name: "SelectTag",
  props: ['selectInfo'],
  mounted() {

  },
  data(){
    return {
      dynamicTags: [],
      dynamicValues: [],
      chooseValue: '',
      inputVisible: false,
    }
  },
  methods: {
    handleConfirm() {
      let optionValue = this.chooseValue;
      let optionLabel = null;
      for (let i = 0; i < this.selectInfo.items.length; i++) {
        if (this.selectInfo.items[i].value===optionValue){
          this.selectInfo.items[i].disabled=true
          optionLabel=this.selectInfo.items[i].label
        }
      }
      if (optionLabel&&!this.dynamicTags.includes(optionLabel)) {
        this.dynamicTags.push(optionLabel);
        this.dynamicValues.push(optionValue);
        for (let i = 0; i < this.selectInfo.items.length; i++) {
          if (this.selectInfo.items[i].label===optionValue){
            this.selectInfo.items[i].disabled=true
          }
        }
      }
      this.inputVisible = false;
      this.chooseValue = '';
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.dynamicValues.splice(this.dynamicTags.indexOf(tag), 1);
      for (let i = 0; i < this.selectInfo.items.length; i++) {
        if (this.selectInfo.items[i].label===tag){
          this.selectInfo.items[i].disabled=false
        }
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.select.$el.style.display="inline-block"
        this.$refs.select.$el.style.float="right"
        this.$refs.select.$el.style.width="100px"
      });
    },
  }
}
</script>

<style scoped lang="less">
.questionType {
  position: absolute;
  left: 130px;
  display: inline-block;

  & > * {
    margin-right: 10px;
  }
}
</style>