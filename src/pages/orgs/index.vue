<template>
  <div >
    <mp-search @on-input="onSearchChange" @on-submit="onSearchConfirm" />

    <div class="weui-cells__title">操作</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-cell
        :icon="icon"
        label="添加部门"
        link="/aaa"
        has-arraw
      />
      <mp-cell
        :icon="icon"
        label="邀请成员"
        link="/aaa"
        has-arraw
      />
    </div>

    <div class="weui-cells__title">通讯录</div>
    <div class="weui-cells weui-cells_after-title">
      <mp-cell
        :icon="icon"
        label="张三"
        link="/aaa"
        has-arraw
      />
      <mp-cell
        :icon="icon"
        label="李四"
        link="/aaa"
        has-arraw
      />
      <mp-cell
        :icon="icon"
        label="王五"
        link="/aaa"
        has-arraw
      />
    </div>

  </div>
</template>

<script>
  import wx from 'wx'
  import { mapState, mapActions } from 'vuex'
  import MpCell from 'weui-cell'
  import MpSearch from 'weui-search'
  import base64Icon from '../../../static/assets/base64Icons'

  export default {
    components: {
      MpCell,
      MpSearch
    },
    data () {
      return {
        icon: base64Icon.icon20
      }
    },
    computed: {
      ...mapState([
      ])
    },
    mounted () {
    },
    onPullDownRefresh () {
    },
    // onReachBottom () {
    //   this.loadmore()
    // },
    methods: {
      ...mapActions([
      ]),
      onSearchChange (value) {
        // this.searchValue = value;
        wx.showToast({
          title: `onSearchChange:${value}`,
          icon: 'none'
        })
      },
      onSearchConfirm (value) {
        wx.showToast({
          title: `onSearchChange:${value}`,
          icon: 'none'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
