<template>
  <div id="app">
    <keep-alive>
      <router-view ref="current"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import 'mp-weui-platform/styles/weui.css'
// import PullTo from 'vue-pull-to'

export default {
  name: 'App',
  mpType: 'app',
  components: {
  },
  data () {
    return {
      onPullDownRefresh: null,
      onReachBottom: null
    }
  },
  methods: {
    async refresh (loaded) {
      await this.onPullDownRefresh.call(this.$refs.current)
      loaded()
    },
    async loadmore (loaded) {
      await this.onReachBottom.call(this.$refs.current)
      loaded()
    },
    saveScrollPosition (e) {
      const { current } = this.$refs
      current.scrollTop = e.srcElement.scrollTop
    }
  },
  watch: {
    $route () {
      this.$nextTick(() => {
        const { current } = this.$refs
        if (!current) return
        this.onPullDownRefresh = current.$options.onPullDownRefresh
        this.onReachBottom = current.$options.onReachBottom
      })
    }
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  body {
    background-color: #f8f8f8;
    font-size: 16px;
    font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
  }
</style>
