<template>
  <div >
    <div class="weui-cells__title">当前运动数据</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-cell
        content="公里数"
        label="123123"
        href="/aaa"
      />
      <mp-cell
        content="步数"
        label="123123"
        href="/aaa"
      />
      <mp-cell
        content="卡路里"
        label="123123"
        href="/aaa"
      />
    </div>

    <div class="weui-cells__title">我的活动</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-cell
        content="挑战100公里"
        href="/aaa"
      />
      <mp-cell
        content="挑战100公里"
        href="/aaa"
      />
    </div>

    <div class="weui-cells__title">设置</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-cell
        content="运动数据源"
        label="悦动圈"
        href="/aaa"
      />
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
