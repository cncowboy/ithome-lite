<template>
  <div class="tab" style="height:100%;">
    <view-box ref="viewBox">
      <router-view></router-view>
    </view-box>
    <tabbar slot="bottom" style="position: fixed;">
      <tabbar-item :selected="selected == 'ranks'" link="/pages/ranks">
        <img slot="icon" src="/static/assets/icon-home.png">
        <img slot="icon-active" src="/static/assets/icon-home-active.png">
        <span slot="label">排行榜</span>
      </tabbar-item>
      <tabbar-item :selected="selected == 'activities'" link="/pages/activities">
        <img slot="icon" src="/static/assets/icon-type.png">
        <img slot="icon-active" src="/static/assets/icon-type-active.png">
        <span slot="label">活动</span>
      </tabbar-item>
      <tabbar-item :selected="selected == 'orgs'" link="/pages/orgs">
        <img slot="icon" src="/static/assets/icon-shopcar.png">
        <img slot="icon-active" src="/static/assets/icon-shopcar-active.png">
        <span slot="label">通讯录</span>
      </tabbar-item>
      <tabbar-item :selected="selected == 'me'" link="/pages/me">
        <img slot="icon" src="/static/assets/icon-my.png">
        <img slot="icon-active" src="/static/assets/icon-my-active.png">
        <span slot="label">我</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import { ViewBox, Tabbar, TabbarItem } from 'vux'
  export default {
    name: 'tab',
    data () {
      return {
        selected: 'Home'
      }
    },
    mounted () {
      let to = this.$route.name
      // console.log(to)
      if (to === 'ranks') {
        this.selected = 'ranks'
      } else if (to === 'activities') {
        this.selected = 'activities'
      } else if (to === 'orgs') {
        this.selected = 'orgs'
      } else if (to === 'me') {
        this.selected = 'me'
      }
    },
    watch: {

    },
    components: {
      ViewBox,
      Tabbar,
      TabbarItem
    }
  }
</script>

<style scoped>
  html,
  body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .weui-tabbar {
    background-color: #FFFFFF;
  }

  .plus-icon {
    position: absolute;
    top: -24px;
    left: -50%;
    width: 200%;
    height: 200%;
  }
</style>
