import Vue from 'vue'
// import Toast from 'vue2-toast'
import router from '@/router'
import store from '@/store'
// import 'vue2-toast/lib/toast.css'
import { ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)

const appProps = {
  el: '#app',
  router,
  store
}

export default appProps
