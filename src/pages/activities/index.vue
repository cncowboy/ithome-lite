<template>
  <div >
    <mp-swiper :list="slides">
    </mp-swiper>

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
  import MpSwiper from 'platform-components/swiper'

  export default {
    components: {
      MpSwiper
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

</style>
