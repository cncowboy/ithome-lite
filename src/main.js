import Vue from 'vue'
// import store from '@/store'
import App from 'platform-components/App'
import appProps from 'platform-components/appConfig'
import { mergeObjects } from 'utils/utils'

Vue.config.productionTip = false

const app = new Vue(
  mergeObjects(appProps, {
    ...App
  })
)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/ranks/index'
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
        pagePath: 'pages/ranks/index',
        text: '排行榜',
        iconPath: 'static/assets/news.png',
        selectedIconPath: 'static/assets/news-active.png'
      }, {
        pagePath: 'pages/activities/index',
        text: '活动',
        iconPath: 'static/assets/quanzi.png',
        selectedIconPath: 'static/assets/quanzi-active.png'
      }, {
        pagePath: 'pages/orgs/index',
        text: '通讯录',
        iconPath: 'static/assets/news.png',
        selectedIconPath: 'static/assets/news-active.png'
      }, {
        pagePath: 'pages/me/index',
        text: '我',
        iconPath: 'static/assets/quanzi.png',
        selectedIconPath: 'static/assets/quanzi-active.png'
      }]
    }
  }
}
