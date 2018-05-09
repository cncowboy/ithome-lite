<template>
  <div >
    <swiper class="slider-wrap" autoplay indicator-dots
      circular
      indicator-color="rgba(255, 255, 255, .3)"
      indicator-active-color="rgba(210, 34, 34, .7)">
      <swiper-item
        v-for="slide of slides"
        :key="slide.title">
        <div class="slider-item" @click="$router.push(slide.link)">
          <div class="slider-title">{{slide.title}}</div>
          <img class="slider-img" :src="slide.image" mode="aspectFill" />
        </div>
      </swiper-item>
    </swiper>

    <div class="zan-panel">
      <div class="zan-card">
        <div class="zan-card__thumb">
          <image class="zan-card__img"
                 src="https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imagediv2/2/w/200/h/200/q/90/format/jpeg"
                 mode="aspectFit"
          ></image>
        </div>
        <div class="zan-card__detail">
          <div class="zan-card__detail-row">
            <div class="zan-card__left-col zan-ellipsis--l2">
              挑战100天
            </div>
            <div class="zan-card__right-col"></div>
          </div>

          <div class="zan-card__detail-row zan-c-gray-darker">
            <div class="zan-card__left-col">时间：4-3至5-10</div>
          </div>

          <div class="zan-card__detail-row zan-c-gray-darker">
            <div class="zan-card__left-col">参与人数：110</div>
          </div>

          <div class="zan-card__detail-row zan-c-gray-darker">
            <div class="zan-card__left-col zan-c-red">进行中</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
    },
    computed: {
      ...mapState([
        'slides'
      ])
    },
    mounted () {
      this.refresh()
    },
    onPullDownRefresh () {
    },
    // onReachBottom () {
    //   this.loadmore()
    // },
    methods: {
      ...mapActions([
        'getSlides'
      ]),
      async refresh () {
        await Promise.all([
          this.getSlides()
        ])
      }
    }
  }
</script>

<style lang="less" scoped>
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
