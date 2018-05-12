<template>
  <div >
    <div class="weui-flex justify">
      <div class="weui-flex__item justify align">

      </div>
    </div>
    <div class="weui-flex justify">
      <div class="weui-flex__item justify align">
        cncowboy
      </div>
    </div>

    <div class="weui-cells__title">当前运动数据</div>
    <div class="weui-cells weui-cells_after-label">
      <mp-cell
        label="公里数"
        title="123123"
        link="/aaa"
        has-arraw
      />
      <mp-cell
        label="步数"
        title="123123"
        link="/aaa"
        is-link
      />
      <mp-cell
        label="卡路里"
        title="123123"
        link="/aaa"
        has-arraw
      />
    </div>

    <div class="weui-cells__title">我的活动</div>
    <div class="weui-cells weui-cells_after-label">
      <mp-cell
        label="挑战100公里"
        link="/aaa"
        has-arraw
      />
      <mp-cell
        label="挑战100公里"
        link="/aaa"
        has-arraw
      />
    </div>
    <div class="weui-cells__title">设置</div>
    <div class="weui-cells weui-cells_after-label">
      <mp-cell
        label="运动数据源"
        title="悦动圈"
        link="/pages/ranks"
        has-arraw
      ></mp-cell>
    </div>

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import MpCell from 'weui-cell'
  import base64Icon from '../../../static/assets/base64Icons'

  export default {
    components: {
      MpCell
    },
    computed: {
      ...mapState([
      ])
    },
    mounted () {
    },
    data () {
      return {
        icon: base64Icon.icon20
      }
    },
    onPullDownRefresh () {
    },
    // onReachBottom () {
    //   this.loadmore()
    // },
    methods: {
      ...mapActions([
      ])
    }
  }
</script>

<style lang="less" scoped>
  .justify{
    display: flex;
    justify-content: center;
  }
  .align{
    align-items: center;
  }
</style>
