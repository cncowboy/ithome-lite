import Vue from 'vue'
import Vuex from 'vuex'
import xml2json from 'xmlstring2json'
import { formatSlideList, formatNewsList, formatTopicList } from '@/utils'
import api from '@/utils/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    slides: [{
      title: '你好',
      img: 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imagediv2/2/w/200/h/200/q/90/format/jpeg',
      url: ''
    }, {
      title: '你好',
      img: 'https://img.yzcdn.cn/upload_files/2016/11/25/FpqPXlrMRjKwJs8VdTu3ZDJCj4j5.jpeg?imagediv2/2/w/200/h/200/q/90/format/jpeg',
      url: ''
    }],
    news: [],
    topics: [],
    user: {},
    activedEmployee: {CompanyId: 0},
    companies: {}
  },
  mutations: {
    slides (state, data) {
      state.slides = data
    },
    news (state, data) {
      state.news = data
    },
    topics (state, data) {
      state.topics = data
    },
    initInfo (state, data) {
      state.user = data.user
      state.activedEmployee = data.activedEmployee
      state.companies = data.companies
    }
  },
  actions: {
    async getSlides ({ commit }) {
      const slides = await api.getSlides()
      if (!slides) return
      const parsedSlides = xml2json(slides).rss.channel.item
      const filtedSlides = parsedSlides.filter(
        slide => slide.opentype['#text'] === '1'
      )
      const formatedSlides = filtedSlides.map(formatSlideList)
      commit('slides', formatedSlides)
    },
    async getNewsList ({ state, commit }, init) {
      const news = await api.getNewsList()
      if (!news) return
      const formatedNews = news.newslist.map(formatNewsList)
      if (init) {
        commit('news', formatedNews)
      } else {
        commit('news', state.news.concat(formatedNews))
      }
    },
    async getTopics ({ state, commit }, init) {
      let replytime = Date.now()
      if (!init) {
        const lastTopic = state.topics[state.topics.length - 1]
        replytime = lastTopic.replytime.replace(/[^0-9]/ig, '')
      }
      const topics = await api.getTopics(replytime)
      if (!topics) return
      const formatedTopics = topics.map(formatTopicList)
      if (init) {
        commit('topics', formatedTopics)
      } else {
        commit('topics', state.topics.concat(formatedTopics))
      }
    },
    async getInitInfo ({ state, commit }, init) {
      const initInfo = await api.getInitInfo()
      if (initInfo) {
        commit('initInfo', initInfo)
      }
    }
  }
})

export default store
