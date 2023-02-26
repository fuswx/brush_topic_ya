<template>
  <div id="header">
    <el-menu :default-active="activeIndex" class="el-menu-demo menu" mode="horizontal" @select="handleSelect">
      <el-menu-item class="logo el-menu-item-hover" index="1">
        <router-link class="logo" to="/home">
          <img src="./img/logo.jpg" alt="logo">
          <span>刷题喵</span>
        </router-link>
      </el-menu-item>
      <el-menu-item class="el-menu-item-hover" index="2">
        <router-link to="/home">
          首页
        </router-link>
      </el-menu-item>
      <el-menu-item class="el-menu-item-hover" index="3">
        <router-link to="/topic/listForm">
          问卷
        </router-link>
      </el-menu-item>
      <el-menu-item class="el-menu-item-hover" index="4">
        <router-link to="/question/listQuestion">
          题目
        </router-link>
      </el-menu-item>
<!--      <el-menu-item class="el-menu-item-hover" index="5">-->
<!--        <router-link to="/topic/setTopic">-->
<!--          出题-->
<!--        </router-link>-->
<!--      </el-menu-item>-->
      <el-menu-item index="6" id="noHover">
        <el-input  class="searchFrom" v-model="input" placeholder="请输入内容"></el-input>
        <el-button type="primary" class="searchBtn">搜索</el-button>
      </el-menu-item>

      <el-submenu index="7" class="dropdown">
        <template slot="title">
          <img style="width: 30px;height: 30px" id="header-item-img" src="./img/user.jpg" alt="userImage">
          <span v-if="1" id="header-item-name">root</span>
          <span v-if="0" id="header-item-name-none">未登录</span>
        </template>
        <el-menu-item index="7-1" id="header-info-first">
          <div id="header-userImg"><a href="#"><img src="./img/user.jpg" alt="userImage" /></a></div>
          <span id="header-userName">root</span>
          <span id="header-userName-none" v-if="0">未登录</span>
          <span>最后登录：12:00 PM</span>
        </el-menu-item>
        <el-menu-item index="7-2" id="header-info-passwordChange">
          <a href="#">信息修改</a>
        </el-menu-item>
        <el-menu-item index="7-3" id="header-info-logout">
          <a href="#">注销</a>
          <a href="#" v-if="false">登录</a>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      input: ''
    };
  },
  mounted() {
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped lang="less">
@font-color: cornflowerblue;
@transition-all:all 0.5s linear;

#header-info {
  width: 260px;
  height: auto;
  padding-bottom: 5px;
}
#header-info-first {
  width: 260px;
  height: auto;
  padding: 5px;
  text-align: center;
  align-items: center;
  background-color: cornflowerblue!important;

  span {
    color: #f4f4f4!important;
  }
}
#header-userImg {
  margin-left: calc(~"(100% - 82px)/2");
  display: block;
  width: 90px;
  height: 90px;
  border-radius: 90px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 5px;

  a {

    img {
      display: inline-block;
      height: 100px;
      width: 100px;
      border-color: rgba(255,255,255,0.2);
      max-height: none;
      margin-top: -6px;
    }
  }
}
#header-info-first {
  padding-bottom: 5px;

  span {
    display: block;
    color: cornflowerblue;
    font-weight: 700;
    font-size: 14px;
  }
}
#header-info-passwordChange ,
#header-info-login ,
#header-info-logout {
  padding: 0!important;
  height: 40px;
  line-height: 40px;
}
#header-info-passwordChange > a,
#header-info-login > a,
#header-info-logout > a {
  display: block;
  width: 100%;
  height: 100%;
  font-weight: 700;
  font-size: 14px;
  color: cornflowerblue;
  text-align: center;
  transition: @transition-all;
  line-height: 40px;

  &:hover {
    color: #f4f4f4;
    text-decoration: none;
  }
}

#header-item-img {
  display: inline-block;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  margin-right: 5px;
}

#header {
  box-shadow: rgba(0,0,0,0.10) 3px 3px 2px;

  .el-menu-item-hover:hover {
    background-color: cornflowerblue;
    color: #f4f4f4;

    a {
      color: #f4f4f4;
      span {
        color: #f4f4f4;
      }
    }
  }

  .searchBtn {
    height: 40px;
    border-radius: 0 3px 3px 0;
    margin-top: -8px;
  }

  .menu {
    height: 60px;
    background-color: #f4f4f4;

    .dropdown {
      float: right;
    }

    .el-menu-item {
      transition: @transition-all;
      height: 60px;
      border-radius: 3px;
    }

    a {
      color: @font-color;
      font-weight: 600;
      border-radius: 5px;
      display: block;
      transition: @transition-all;
      text-decoration: none;

      div {
        margin-top: 5px;
      }

    }

    .logo {
      width: 200px;

      img {
        display: block;
        width: 40px;
        height: 40px;
        margin: 10px 10px 10px 5px;
        float: left;
      }

      span {
        display: block;
        width: 80px;
        float: left;
        text-align: center;
        font-size: 18px;
        font-weight: 900;
        line-height: 60px;
        color: @font-color;
      }

    }

    .searchForm {
      margin-left: 100px;
      width: 30%;
      max-width: 600px;
      min-width: 200px;
      border-radius: 8px;
    }
  }

}
</style>