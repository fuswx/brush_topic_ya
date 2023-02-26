<template>
  <div>

    <div id="left-box">
      <TreeList v-bind:datas="datas"></TreeList>
    </div>
    <div id="right-box">
      <BreadCrumb v-bind:breadCrumbs="breadCrumbs"></BreadCrumb>

      <div id="title-div">
        <div id="title">
          <span>
            <h1>
              <input name="title" type="text" v-model="title" id="title-text" placeholder="请输入标题名称"/>
            </h1>
          </span>
        </div>
      </div>

      <div id="right-box-content">

        <component ref="component"
                   style="border-top: solid 2px rgba(230,230,230,0.6);padding-top: 10px"
                   v-bind:isStatus="'create'"
                   v-bind:index="index"
                   v-for="(component,index) in componentsName"
                   :key="index" :is="component.name">
        </component>

        <el-row v-if="componentsName.length>=1" style="border-top: solid 2px rgba(230,230,230,0.6);padding-top: 10px">
          <el-button type="primary" plain @click="open">我要提交</el-button>
        </el-row>
      </div>

      <transition
          enter-active-class="animate__animated animate__bounceInLeft"
          leave-active-class="animate__animated animate__bounceOutLeft"
      >
        <div id="show-box" ref="showBox">
          <span id="input-title">{{inputTitle}}</span>
          <div id="input-contents">
            <div id="box-checked">
            <span id="input-content">
<!--              <span v-html="inputContent">inputContent</span>-->
              <Radio     v-bind:isStatus="'show'" v-if="this.inputId===1"></Radio>
              <CheckBox  v-bind:isStatus="'show'" v-if="this.inputId===2"></CheckBox>
              <Select    v-bind:isStatus="'show'" v-if="this.inputId===3"></Select>
              <Input     v-bind:isStatus="'show'" v-if="this.inputId===4"></Input>
              <Inputs    v-bind:isStatus="'show'" v-if="this.inputId===5"></Inputs>
              <TextAreas v-bind:isStatus="'show'" v-if="this.inputId===6"></TextAreas>
              <Icon      v-bind:isStatus="'show'" v-if="this.inputId===7"></Icon>
            </span>
            </div>
          </div>
        </div>
      </transition>

    </div>

  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import {v4 as uuidv4} from "uuid";

import TreeList from "@/components/TreeList/TreeList.vue";
import Radio from "@/components/Inputs/Radio/Radio.vue";
import CheckBox from "@/components/Inputs/CheckBox/CheckBox.vue";
import Select from "@/components/Inputs/Select/Select.vue";
import Input from "@/components/Inputs/Input/Input.vue";
import Inputs from "@/components/Inputs/Inputs/Inputs.vue";
import Icon from "@/components/Inputs/Icon/Icon.vue";
import TextAreas from "@/components/Inputs/TextAreas/TextAreas.vue";
import BreadCrumb from "@/components/BreadCrumb/BreadCrumb.vue";

export default {
  name: "SetTopics",
  components: {BreadCrumb, TextAreas, Icon, Inputs, Input, Select, CheckBox, Radio, TreeList},
  computed: {
    ...mapGetters(['componentsName']),
    ...mapState({
      allInput: state => state.SetTopic.allInput,
    })
  },
  data(){
    return {
      title: "",
      filterText: '',
      breadCrumbs: [{name:'设置问卷'}],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      inputTitle: "",
      inputContent: "",
      inputId: 0,
      postDatas:{
        id: uuidv4(),
        components: [],
        componentNum: 0,
        uploadUserId: Math.round(Math.random()*100),
        uploadTime: null,
        updateTime: null,
        eg: ""
      },
      datas: [
        {title: '选择题',data: [{label: '单选',inputId: 1},{label: '多选',inputId: 2},{label: '下拉框',inputId: 3}]},
        {title: '填空题',data: [{label: '单项填空',inputId: 4},{label: '多项填空',inputId: 5},{label: '矩阵填空',inputId: 6},{label: '表格填空',inputId: 7}]},
        {title: '矩阵题',data: [{label: '矩阵单选',inputId: 8},{label: '矩阵量表',inputId: 9},{label: '矩阵滑动条',inputId: 10},{label: '表格下拉框',inputId: 11}]},
        {title: '量表题',data: [{label: '量表题',inputId: 12},{label: 'NPS量表',inputId: 13},{label: '评分单选',inputId: 14},{label: '评分多选',inputId: 15},{label: '矩阵量表',inputId: 16},{label: '评价题',inputId: 17}]},
        {title: '个人信息',data: [{label: '姓名',inputId: 18},{label: '基本信息',inputId: 19},{label: '性别',inputId: 20},{label: '年龄段',inputId: 21},{label: '省市',inputId: 22},{label: '省市区',inputId: 23},{label: '手机',inputId: 24},{label: '日期',inputId: 25},{label: '时间',inputId: 26},{label: '职业',inputId: 27},{label: '行业',inputId: 28},{label: '高校',inputId: 29},{label: '邮寄地址',inputId: 30}]},
          ],
    }
  },
  methods:{
    enterMethod(inputId){
      this.inputId=inputId+1;
      this.inputTitle=this.allInput[inputId].desc
      this.inputContent=this.allInput[inputId].content
      this.$refs.showBox.style.display="block"
      this.$refs.showBox.style.top=event.clientY+document.body.scrollTop+-this.$refs.showBox.clientHeight/2+"px"
      if (event.clientY-this.$refs.showBox.clientHeight/2<60){
        this.$refs.showBox.style.top='60px'
      }
    },
    leaveMethod(){
      this.$refs.showBox.style.display="none"
    },
    clickMethod(inputId){
      this.componentsName.push({name:this.allInput[inputId].name})
    },
    submitQuestionnaire(){
      for (let i = 0; i < this.componentsName.length; i++) {
        let initAnswer=[];
        let items=[];
        const inputsName=['Input','Inputs','TextAreas','Icon'];//对填空答案进行特殊处理
        if (inputsName.includes(this.componentsName[i].name)){
          initAnswer=this.$refs.component[i].items;
          items=[];
        }else {
          initAnswer=this.$refs.component[i].initAnswer;
          items=this.$refs.component[i].items;
        }
        const component={
          componentName: this.componentsName[i].name,
          title: this.$refs.component[i].title,
          items: items,
          initAnswer: initAnswer
        };
        this.postDatas.componentNum=this.componentsName.length
        this.postDatas.components.push(component)
      }
      this.postDatas.id=uuidv4();
      this.postDatas.title=this.title;
      this.postDatas.updateTime=new Date();
      this.postDatas.uploadTime=new Date();
      //提交创建的表单信息
      console.log(this.postDatas)
      this.$store.dispatch("submitDefinitionForm",this.postDatas)

      this.$router.push("/topic/getTopic?formId="+this.postDatas.id)
    },
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
        this.postDatas.components=[]
        this.$message({
          type: 'info',
          message: '提交失败'
        });
      });
    }
  },
  mounted() {
    //派发action获取组件的数据
    this.$store.dispatch("findAllInput")
    if (this.$route.query.formId!==undefined){
      this.$store.dispatch("getTopicFrom",this.$route.query.formId)
    }
  },
}
</script>

<style scoped lang="less">
@import "public/definition";

.el-button {
  transition: @transition-all;
  font-size: 14px;
  font-weight: 700;
}

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
  background-color: white;
}

input::-webkit-input-placeholder {
  color: #3c3c3c;
}

input,textarea {
  resize: none;
  outline: none;
  border: none;
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
  width: calc(~"(100% - @{sliderWidth})");
  float: right;
}
#right-box-content {
  div {
    margin-bottom: 20px;
    padding-left: 5%;
    padding-right: 5%;
  }
}

#tab-treetable {
  height: 700px;
  width: @sliderWidth;
  position: fixed;
  overflow-y: auto;
  margin-right: 0;
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
  background-color: white;
}
#title {
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
  text-align: left;
  line-height: 30px;
  margin: 20px 3% 20px 5%;
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
  position: fixed;
  display: none;
  transition: 1s;
  border-radius: 10px;
  left: @sliderWidth;
  border: 2px cornflowerblue solid;
  z-index: @maxZIndex;
  padding-bottom: 10px;
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
  margin-bottom: 0;
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