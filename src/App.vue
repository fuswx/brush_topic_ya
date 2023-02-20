<template>
  <div id="app">
    <Header></Header>
    <div id="passage">
      <transition
          enter-active-class="animate__animated animate__backInLeft animate__faster"
          leave-active-class="animate__animated animate__backOutLeft animate__fast">
        <Slider ref="silder" id="slider" v-show="isShow&&this.$route.path!=='/topic/setTopic'"></Slider>
      </transition>

      <Content :style="this.$route.path==='/topic/setTopic'?hiddenSilder:''" id="content" ref="content"></Content>
    </div>
  </div>
</template>

<script>

import Header from "@/components/Header/Header.vue";
import Slider from "@/components/Slider/Slider.vue";
import Content from "@/components/Content/Content.vue";

export default {
  name: 'App',
  computed: {
  },
  components: {
    Content,
    Slider,
    Header
  },
  data(){
    return {
      isShow: true,
      contentWidth: null,
      hiddenSilder: {
        width: '100%'
      }
    }
  },
  methods:{
    showSilder(){
      let scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop<10){
        this.isShow=true
        this.$refs.content.$el.style.width=this.contentWidth+'px'
      }else {
        this.isShow=false
        this.$refs.content.$el.style.width=this.contentWidth+this.$refs.silder.$el.clientWidth+'px'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll',this.showSilder)
    this.contentWidth=this.$refs.content.$el.clientWidth
    console.log(window.innerWidth)
  }
}
</script>

<style lang="less">
@import "public/definition";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
#header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: block;
  z-index: @maxZIndex;
}
#passage {
  margin-top: @headerHeight;
  height: auto;

  #slider {
    position: fixed;
    top: calc(~"@{headerHeight}");
    width: @sliderWidth;
    --animate-delay: 0s;
  }

  #content {
    float: right;
    width: calc(~"(100% - @{sliderWidth})");
    min-height: 1000px;
    transition: @transition-all;
    margin-top: 0;
    background-color: #f4f4f4;
  }
}
</style>
