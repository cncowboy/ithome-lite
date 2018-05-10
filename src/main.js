import Vue from 'vue'
// import store from '@/store'
import App from '@/components/mp/App'
import appProps from '@/components/mp/appConfig'

Vue.config.productionTip = false

const app = new Vue({
  appProps,
  ...App
})
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/ranks'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#f8f8f8',
      backgroundColorTop: '#f8f8f8',
      navigationBarBackgroundColor: '#f8f8f8',
      navigationBarTitleText: '企业运动服务',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#999',
      selectedColor: '#d22222',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/ranks',
        text: '排行榜',
        iconPath: 'static/assets/news.png',
        selectedIconPath: 'static/assets/news-active.png'
      }, {
        pagePath: 'pages/activities',
        text: '活动',
        iconPath: 'static/assets/quanzi.png',
        selectedIconPath: 'static/assets/quanzi-active.png'
      }, {
        pagePath: 'pages/orgs',
        text: '通讯录',
        iconPath: 'static/assets/news.png',
        selectedIconPath: 'static/assets/news-active.png'
      }, {
        pagePath: 'pages/me',
        text: '我',
        iconPath: 'static/assets/quanzi.png',
        selectedIconPath: 'static/assets/quanzi-active.png'
      }]
    }
  }
}
