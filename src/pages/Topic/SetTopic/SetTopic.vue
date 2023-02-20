<template>
  <div id="setTopic">

    <div id="left-box">
      <TreeList v-bind:datas="datas"></TreeList>
    </div>
    <div id="right-box">
      <div id="title-div">
        <div id="title">
          <span>
            <h1><input name="title" type="text" id="title-text" placeholder="请输入标题名称"/></h1>
          </span>
        </div>
      </div>

      <div id="right-box-content">

      </div>
      <form method="post" id="total-content" action="${pageContext.request.contextPath}/form/submit.do">
        <div id="none-box" style="display: none">
          <input type="text" id="pageTitle" name="pageTitle">
          <input type="text" id="totalTitle" name="totalTitle">
          <input type="text" id="totalText" name="totalText">
          <input type="text" id="submitType" name="submitType" value="submit">
          <input type="text" id="formId" name="formId" value="null">
        </div>
      </form>

      <div id="show-box" ref="showBox">
        <span id="input-title">{{inputTitle}}</span>
        <div id="input-contents">
          <div id="box-checked">
            <span id="input-content">
              <span v-html="inputContent">inputContent</span>
            </span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import TreeList from "@/components/TreeList/TreeList.vue";
import {mapState} from "vuex";

export default {
  name: "SetTopic",
  components: {TreeList},
  computed: {
    ...mapState({
      allInput: state => state.SetTopic.allInput
    })
  },
  data(){
    return {
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      inputTitle: "",
      inputContent: "",
      datas: [
        {title: '选择题',data: [{label: '单选',inputId: 1},{label: '多选',inputId: 2},{label: '下拉框',inputId: 3}]},
        {title: '填空题',data: [{label: '单项填空',inputId: 4},{label: '多项填空',inputId: 5},{label: '矩阵填空',inputId: 6},{label: '表格填空',inputId: 7}]},
        {title: '填空题',data: [{label: '矩阵单选',inputId: 8},{label: '矩阵量表',inputId: 9},{label: '矩阵滑动条',inputId: 10},{label: '表格下拉框',inputId: 11}]},
        {title: '填空题',data: [{label: '量表题',inputId: 12},{label: 'NPS量表',inputId: 13},{label: '评分单选',inputId: 14},{label: '评分多选',inputId: 15},{label: '矩阵量表',inputId: 16},{label: '评价题',inputId: 17}]},
        {title: '填空题',data: [{label: '姓名',inputId: 18},{label: '基本信息',inputId: 19},{label: '性别',inputId: 20},{label: '年龄段',inputId: 21},{label: '省市',inputId: 22},{label: '省市区',inputId: 23},{label: '手机',inputId: 24},{label: '日期',inputId: 25},{label: '时间',inputId: 26},{label: '职业',inputId: 27},{label: '行业',inputId: 28},{label: '高校',inputId: 29},{label: '邮寄地址',inputId: 30}]},
          ]
    }
  },
  methods:{
    enterMethod(inputId){
      this.inputTitle=this.allInput[inputId].desc
      this.inputContent=this.allInput[inputId].content
      this.$refs.showBox.style.display="block"
      this.$refs.showBox.style.top=event.clientY+"px"
    },
    leaveMethod(){
      this.$refs.showBox.style.display="none"
    }
  },
  mounted() {
    //派发action获取组件的数据
    this.$store.dispatch("findAllInput")
  }
}
</script>

<style scoped lang="less">
@import "public/definition";

#slider {
  box-shadow: rgba(0,0,0,0.10) 3px 3px 2px;
  float: left;
  position: fixed;
  top: calc(~"@{headerHeight}");
  width: @sliderWidth;
  left: 0;
  --animate-delay: 0s;
  overflow-y: auto;
  height: calc(100vh - ~"@{headerHeight}");
}

input::-webkit-input-placeholder {
  color: #3c3c3c;
}

input,textarea {
  resize: none;
  outline: none;
  border: none;
}

#setTopic {
  height: auto;
}

#left-box,
#right-box {
  float: left;
}

#left-box {
  width: @sliderWidth;
  height: 1000px;
}
#right-box {
  background-color: white;
  width: calc(~"(100% - @{sliderWidth})");
  float: right;
}

#tab-treetable {
  height: 700px;
  width: @sliderWidth;
  position: fixed;
  overflow-y: auto;
  margin-right: 0px;
  background-color: white;
}

#chooseForm > thead > tr > th{
  margin-bottom: 5px;
}

.option {
  width: 18%;
}

.option > td {
  width: 18%;
  font-size: 12px!important;
  text-align: left!important;
  height: 60px;
  padding-top: 20px!important;
}

.option >td >span {
  padding-left: 0!important;
}

.option > td:hover {
  background-color: cornflowerblue;
  color: #f4f4f4;
  border-radius: 5px;
  cursor: pointer;
}

.option-title {
  width: 10% !important;
  height: 60px!important;
}

.option-title > td {
  font-size: 12px;
  font-weight: 600;
  position: relative;
  padding-top: 20px!important;
}
.option-title > td:last-child {
  border-radius: 0 0 5px 5px!important;
}

#option-head > th {
  width: 10%!important;
  padding-right: 0 !important;
  font-size: 14px;
  text-align: center;
  border: 1px solid cornflowerblue;
  border-radius: 5px;
  background-color: cornflowerblue;
  color: #f4f4f4;
}

#title-div {
  width: 100%;
  height: 120px;
  cursor: pointer;
}
#title {
  width: 80%;
  height: 70px;
  margin: 0 auto;
  text-align: center;
  padding-top: 2px;
}
#title-text {
  display: block;
  width: 100%;
  height: 70px;
  cursor: text;
  border: solid 2px cornflowerblue;
  background-color: white;
  text-align: center;
}

#others {
  width: 95%;
  height: 30px;
  margin-top: 20px;
  margin-left: 5%;
  text-align: left;
  line-height: 30px;
  margin-bottom: 20px;
  margin-right: 3%;
}

#others > #others-content {
  width: 100%;
  height: 60px;
  margin-right: 3%;
  display: block;
  text-align: left;
  border: 2px solid cornflowerblue;
  line-height: 20px;
  background-color: white;
  cursor: text;
}

/*类型选择预览*/
#show-box {
  width: 400px;
  background-color: rgba(255,255,255,0.6);
  min-height: 200px;
  position: absolute;
  display: none;
  transition: 1s;
  border-radius: 10px;
  left: @sliderWidth;
  border: 2px cornflowerblue solid;
}
#input-content {
  font-weight: 700;
  font-size: 16px;
}

#input-title {
  width: 95%;
  height: 30px;
  display: block;
  text-align: left;
  line-height: 30px;
  margin-top: 10px;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
}
#box-checked {
  width: 95%;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.input-warp {
  display: block;
}

.radio-text {
  font-size: 16px;
  font-weight: 600;
}
.input-font-text {
  border: 2px solid cornflowerblue;
  width: 300px;
  height: 30px;
  border-radius: 5px;
  background-color: #f1f1f1;
}
.input-mul-warp {
  display: block;
  margin-top: 10px;
}
.input-mul-warp:nth-child(0) {
  margin-top: 0;
}
.input-font-mul-text {
  margin-left: 5px;
  border-bottom: 2px solid cornflowerblue;
  background-color: #f1f1f1;
}

/*右边*/

.detail {
  margin-left: 40px;
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 15px;
  padding-top: 15px;
}

.detail-title input {
  font-size: 20px;
  font-weight: 600;
}
.detail-content {
  margin-top: 10px;
}

.detail-text {
  margin-left: 5px;
}


.detail-warp {
  display: block;
  margin-top: 10px;
}
.removeButton:hover,.addButton:hover {
  background-color: #f4f4f4;
  color: cornflowerblue;
}
.removeButton,.addButton {
  width: 60px;
  height: 30px;
  background-color: cornflowerblue;
  margin-left: 5px;
  outline: none;
  border: 1px solid cornflowerblue;
  border-radius: 3px;
  color: #f4f4f4;
  transition: all 0.3s linear;
}
.mult-text {
  width: 80px;
  text-align: center;
}


</style>