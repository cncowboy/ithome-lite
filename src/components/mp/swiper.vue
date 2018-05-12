<template>
  <swiper class="slider-wrap" autoplay="auto" indicator-dots="showDots"
          circular="loop"
          indicator-color="rgba(255, 255, 255, .3)"
          indicator-active-color="rgba(210, 34, 34, .7)">
    <swiper-item
      v-for="slide of list"
      :key="slide.title">
      <div class="slider-item" @click="$router.push(slide.url)">
        <div class="slider-title">{{slide.title}}</div>
        <img class="slider-img" :src="slide.img" mode="aspectFill" />
      </div>
    </swiper-item>
  </swiper>
</template>

<script>
  export default {
    name: 'MpSwiper',
    props: {
      list: {type: Array, default: []},
      showDots: { type: Boolean, default: true },
      auto: { type: Boolean, default: true },
      loop: { type: Boolean, default: true }
    },
    computed: {
    }
  }
</script>

<style lang="less">
  .slider-wrap {
    width: 100%;
    height: 200px;
  }
  .slider-item {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .slider-title {
    max-width: 90vw;
    position: absolute;
    top: 10px;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    color: #fff;
    padding: 2px 6px;
    font-size: 18px;
  }
  .slider-img {
    width: 100%;
    height: 100%;
  }
</style>
