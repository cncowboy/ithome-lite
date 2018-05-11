<template>
  <div >
    <div class="weui-cells__title">当前运动数据</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-cell
        title="公里数"
        value="123123"
        link="/aaa"
        is-link
      />
      <mp-cell
        title="步数"
        value="123123"
        link="/aaa"
        is-link
      />
      <mp-cell
        title="卡路里"
        value="123123"
        link="/aaa"
        is-link
      />
    </div>

    <div class="weui-cells__title">我的活动</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-cell
        title="挑战100公里"
        link="/aaa"
        is-link
      />
      <mp-cell
        title="挑战100公里"
        link="/aaa"
        is-link
      />
    </div>
    <div class="weui-cells__title">设置</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-cell
        title="运动数据源"
        value="悦动圈"
        link="/pages/ranks"
        is-link="true"
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
</style>
