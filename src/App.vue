<template>
  <div id="app">
    <Header></Header>
    <div id="passage">
      <transition
          enter-active-class="animate__animated animate__backInLeft animate__faster"
          leave-active-class="animate__animated animate__backOutLeft animate__fast">
        <Slider ref="slider" id="slider" v-show="isShow&&(this.$route.path!=='/topic/setTopic'||this.$route.path==='/question/setQuestion')"></Slider>
      </transition>

      <Content v-bind:content-width="contentWidth" :style="this.$route.path==='/topic/setTopic'||this.$route.path==='/question/setQuestion'?hiddenSlider:''" ref="content"></Content>

    </div>

  </div>
</template>

<script>

import Header from "@/components/Header/Header.vue";
import Slider from "@/components/Slider/Slider.vue";
import Content from "@/components/Content/Content.vue";
import {c} from "caniuse-lite/data/browserVersions";

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
      sliderWidth: null,
      hiddenSlider: {
        width: this.contentWidth-this.sliderWidth+"px"
      }
    }
  },
  methods:{
    c() {
      return c
    },
    showSlider(){
      if (this.$route.path!=='/topic/setTopic'&&this.$route.path!=='/question/setQuestion'){
        this.resize()
      }
    },
    resize(){
      let scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop<=0){
        this.isShow=true
        this.$refs.content.$el.style.width=this.contentWidth+'px'
      }else {
        this.isShow=false
        this.$refs.content.$el.style.width=this.contentWidth+this.sliderWidth+'px'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll',this.showSlider)
    window.addEventListener('resize',()=>{
      this.contentWidth=document.body.clientWidth-this.sliderWidth
      this.resize()
    })
    this.contentWidth=this.$refs.content.$el.clientWidth
    this.sliderWidth=this.$refs.slider.$el.clientWidth
  }
}
</script>

<style lang="less">
@import "public/common";

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

  &::after {
    content: '';
    /*建议加个height:0*/
    height: 0;
    display: block;
    clear: both;
    visibility: hidden;
  }

  #slider {
    position: fixed;
    top: calc(~"@{headerHeight}");
    width: @sliderWidth;
    --animate-delay: 0s;
    background-color: white;
  }

}
</style>
