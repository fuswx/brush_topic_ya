<template>
  <TreeList v-bind:datas="datas"></TreeList>
</template>

<script>
import {mapGetters} from "vuex";
import TreeList from "@/components/TreeList/TreeList.vue";

export default {
  name: 'Slider',
  components: {TreeList},
  data() {
    return {
      gradeId: undefined,
      subjectId: undefined,
      sortType: 'time',
    };
  },
  watch: {
  },
  computed: {
    ...mapGetters(['datas'])
  },
  methods: {
    leaveMethod(){},
    enterMethod(){
    },
    clickMethod(value,data){
      if (data.children){
        this.gradeId=data.value
      }else {
        this.subjectId=data.value
        this.$bus.$emit('getGradeIdAndSubjectId',this.subjectId,this.gradeId)
        this.$store.dispatch("getAllQuestion",{pageNum:1,pageSize: 10,sortType: this.sortType,title:'',subjectIds:[this.subjectId],gradeIds:[this.gradeId],types:null,degrees:null})
        this.$router.push('/question/listQuestion')
      }
    }
  },
  mounted() {
    //派发action获取组件的数据
    this.$store.dispatch("getSortGradeList")
    this.$store.dispatch("getSubjectList")
    this.$bus.$on('getSortType',(sortType)=>{
      this.sortType=sortType
    })
  },
  beforeDestroy() {
    this.$bus.$off('getSortType')
  },
}
</script>

<style scoped lang="less">
@import "public/definition";

.innerBox {
  padding-left: 0;
  text-align: left;
}

#slider {
  box-shadow: @box-shadow-all;
  float: left;
  height: calc(100vh - ~"@{headerHeight}");
}

</style>