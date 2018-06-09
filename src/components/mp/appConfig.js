import Vue from 'vue'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'
import VueCookie from 'vue-cookie'

Vue.use(MpvueRouterPatch)
Vue.use(VueCookie)

const appProps = {
  store
}

export default appProps
