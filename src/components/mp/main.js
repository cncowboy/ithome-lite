import Vue from 'vue'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)

const appProps = {
  store
}

export default appProps
