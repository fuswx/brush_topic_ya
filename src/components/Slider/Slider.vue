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
    clickMethod(id){
      console.log(id)
    }
  },
  mounted() {
    //派发action获取组件的数据
    this.$store.dispatch("getSortGradeList")
    this.$store.dispatch("getSubjectList")
  },
  updated() {
  }
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