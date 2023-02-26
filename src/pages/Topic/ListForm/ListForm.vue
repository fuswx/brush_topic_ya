<template>
<div id="listForm">
<!--  <BreadCrumb v-bind:bread-crumbs="[{name:'所有表单'}]"></BreadCrumb>-->
  <div class="listContent">
    <el-table
        ref="multipleTable"
        :data="forms.list"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="id"
          label="表单id"
          >
      </el-table-column>
      <el-table-column
          prop="title"
          label="题目"
          >
      </el-table-column>
      <el-table-column
          prop="componentNum"
          label="题目个数"
      >
      </el-table-column>
      <el-table-column
          prop="uploadUserId"
          label="上传者id"
          >
      </el-table-column>
      <el-table-column
          prop="uploadTime"
          label="上传时间"
          >
      </el-table-column>
      <el-table-column
          prop="updateTime"
          label="更新时间"
          >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150">
        <template slot-scope="scope">
          <el-button @click="clickWatch(scope.row)" type="primary" plain size="mini">查看</el-button>
          <el-button @click="clickEdit(scope.row)" type="danger" plain size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="buttonBox clearFloat">
    <PageHelper v-bind:total="pageInfo.total"></PageHelper>
    <el-button @click="$router.push('/topic/setTopic')" size="small" style="float: right" type="primary" plain>设计问卷</el-button>
  </div>
</div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import PageHelper from "@/components/PageHelper/PageHelper.vue";

export default {
  name: "ListForm",
  computed: {
    ...mapGetters(['pageInfo']),
    ...mapState({
      forms: state => state.ListForm.forms
    }),
  },
  components: {PageHelper},
  mounted() {
    this.$store.dispatch("getAllForm",{pageNum:1,pageSize:10})
  },
  data() {
    return {
      breadCrumbs: [{name: ''}],
      multipleSelection: [],
    }
  },
  methods:{
    clickWatch(row){
      this.$router.push('/topic/getTopic?formId='+row.id)
    },
    clickEdit(row){
      this.$router.push('/topic/setTopic?formId='+row.id)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val){
      this.$store.dispatch("getAllForm",{pageNum:val,pageSize: this.pageInfo.pageSize})
    }
  },
}
</script>

<style scoped lang="less">
@import "public/definition";
@import "public/common.less";
#listForm {
  border-radius: @border-radius-all;
}

.listContent {
  margin-top: 10px;
  border-radius: @border-radius-all;
}
.el-button {
  transition: @transition-all;
}
.el-pagination {
  width: 40%;
}
.el-table {
  border-radius: @border-radius-all;
}
.clearFloat{

  &::after {
    content: '';
    /*建议加个height:0*/
    height: 0;
    display: block;
    clear: both;
    visibility: hidden;
  }
}
.buttonBox {
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>