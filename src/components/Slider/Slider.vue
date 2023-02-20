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
  box-shadow: rgba(0,0,0,0.10) 3px 3px 2px;
  float: left;
  height: calc(100vh - ~"@{headerHeight}");
}

</style>