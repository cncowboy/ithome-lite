module.exports = [
  {
    path: '/pages/user/register',
    name: 'userRegister',
    meta: {
      nav: false
    },
    config: {
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/user/login',
    name: 'userLogin',
    meta: {
      nav: false
    },
    config: {
      enablePullDownRefresh: false
    }
  },
  {
    alias: '/',
    path: '/pages/ranks',
    name: 'ranksIndex',
    meta: {
      nav: true
    },
    config: {
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/activities',
    name: 'activitiesIndex',
    meta: {
      nav: true
    },
    config: {
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/orgs',
    name: 'orgsIndex',
    meta: {
      nav: true
    },
    config: {
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/me',
    name: 'meIndex',
    meta: {
      nav: true
    },
    config: {
      enablePullDownRefresh: false
    }
  },
  {
    path: '/pages/news/list',
    name: 'NewsList',
    meta: {
      nav: false
    },
    config: {
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/news/detail',
    name: 'NewsDetail',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '文章详情'
    }
  },
  {
    path: '/pages/news/comment',
    name: 'NewsComment',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '评论列表'
    }
  },
  {
    path: '/pages/quanzi/list',
    name: 'QuanziList',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '圈子',
      enablePullDownRefresh: true
    }
  },
  {
    path: '/pages/quanzi/detail',
    name: 'QuanziDetail',
    meta: {
      nav: false
    },
    config: {
      navigationBarTitleText: '圈子详情'
    }
  }
]
