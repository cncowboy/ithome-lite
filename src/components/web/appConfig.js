import Vue from 'vue'
import Toast from 'vue2-toast'
import router from '@/router'
import store from '@/store'
import 'vue2-toast/lib/toast.css'

Vue.use(Toast)

const appProps = {
  el: '#app',
  router,
  store
}

export default appProps
