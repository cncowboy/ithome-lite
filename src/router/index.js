import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import footTab from '../components/web/foot-tab'

Vue.use(Router)

const tab = {
  path: '/',
  name: 'Tab',
  component: footTab,
  redirect: '/Home', // 从定向到首页
  children: []
}

for (const route of routes) {
  if (route.meta.nav) {
    const paths = route.path.replace(/^\//, '').split('/')
    const compPath = paths.join('/')
    route.component = () => import(`@/${compPath}`)
    tab.children.push(route)
  }
}

const newRoutes = []
newRoutes.push(tab)

for (const route of routes) {
  if (!route.meta.nav) {
    const paths = route.path.replace(/^\//, '').split('/')
    const compPath = paths.join('/')
    route.component = () => import(`@/${compPath}`)
    newRoutes.push(route)
  }
}

export default new Router({
  routes: newRoutes,
  mode: 'history'
})
