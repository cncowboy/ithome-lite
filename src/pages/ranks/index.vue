<template>
  <div >
    <div class="weui-flex">
      <div class="weui-flex__item">
        <mp-navbar
          v-model="activeIndex"
          :columns="columns"
        >
        </mp-navbar>
      </div>
    </div>
    <div class="weui-flex">
      <div class="weui-flex__item">
        <div
          v-for="(item, index) in columns"
          v-if="activeIndex === index"
          :key="item"
        >
          <div class="weui-flex justify">
            <div class="weui-flex__item justify align">
              排名
            </div>
            <div class="weui-flex__item">
              <div class="weui-flex">
                <div class="weui-flex__item justify align">
                  头像
                </div>
              </div>
              <div class="weui-flex">
                <div class="weui-flex__item justify align">
                  昵称
                </div>
              </div>
            </div>
            <div class="weui-flex__item justify align">
              步数
            </div>
          </div>
          <div class="weui-flex justify">
            <div class="weui-flex__item justify align order">
              1
            </div>
            <div class="weui-flex__item justify align nick">
              东方不败
            </div>
            <div class="weui-flex__item justify align score">
              23423
            </div>
          </div>
          <div class="weui-flex justify">
            <div class="weui-flex__item justify align order" >
              <a :href="getWexinworkLoginUrl" >企业微信登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import MpNavbar from 'weui-navbar'
  import MpProgress from 'mp-weui/packages/progress'
  import qs from 'qs'
  // import MpProgress from 'mpui/components/progress'

  export default {
    components: {
      MpNavbar,
      MpProgress
    },
    data () {
      return {
        columns: ['内部精英榜', '企业风云榜'],
        activeIndex: 0,
        backgroundColor: '#ebebeb',
        activeColor: '#09bb07',
        color: {
          type: String,
          default: '#09bb07'
        }
      }
    },
    computed: {
      getWexinworkLoginUrl: () => {
        const redirectUri = 'http://work.51yund.com:8787/login/wexinwork'
        let url = 'https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=wwa1b64dba72a3bafa&redirect_uri='
          + encodeURIComponent(redirectUri) + '&state=web_login@gyoss9&usertype=member'
        return url
      },
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
      onWexinworkLogin: () => {
      },
      ...mapActions([
      ])
    }
  }
</script>

<style lang="less" scoped>
</style>
<style lang="less">
  .weui-flex {
    display: flex;
  }
  .weui-flex__item{
    flex: 1;
  }

  .justify{
    display: flex;
    justify-content: center;
  }
  .align{
    align-items: center;
  }
  .order{
    flex: 1
  }
  .nick{
    flex: 3
  }
  .score{
    flex: 1
  }
</style>
