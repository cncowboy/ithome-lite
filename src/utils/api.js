import request from './request'

const baseUrlApi = ''
const baseUrlDyn = 'https://dyn.ithome.com'
const baseUrlQuan = 'http://work.51yund.com'

const api = {
  getNewsList: (r) => request.get('/json/newslist/news', null, {
    baseURL: baseUrlApi
  }),
  getNews: (id) => request.get(`/xml/newscontent/${id}.xml`, null, {
    baseURL: baseUrlApi
  }),
  getRelatedNews: (id) => request.get(`/json/tags/0${id.slice(0, 3)}/${id}.json`, null, {
    baseURL: baseUrlApi,
    parseJson: false
  }),
  getNewsComments: (id) => request.get(`/json/commentlist/350/87a8e5b144d81938.json`, null, {
    baseURL: baseUrlDyn
  }),
  getSlides: () => request.get('/xml/slide/slide.xml', null, {
    baseURL: baseUrlApi
  }),
  getTopics: (r) => request.get('/api/post', {
    categoryid: 0,
    type: 0,
    orderTime: r,
    visistCount: '',
    pageLength: ''
  }, {
    baseURL: baseUrlQuan
  }),
  getTopic: (id) => request.get(`/api/post/${id}`, null, {
    baseURL: baseUrlQuan
  }),
  getTopicComments: (id, last) => request.get('/api/reply', {
    postid: id,
    replyidlessthan: last
  }, {
    baseURL: baseUrlQuan
  }),
  login: (params) => {
    const formData = new FormData()
    for (const key in params) {
      formData.append(key, params[key])
    }
    return request.post('/api/login/local', params,
      {
        baseURL: baseUrlApi,
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
  },
  register: (params) => {
    const formData = new FormData()
    for (const key in params) {
      formData.append(key, params[key])
    }
    return request.post('/api/register', params,
      {
        baseURL: baseUrlApi,
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
  },
  getInitInfo: () => {
    return request.get('/api/getInitInfo', {}, {baseURL: baseUrlApi})
  }
}

export default api
