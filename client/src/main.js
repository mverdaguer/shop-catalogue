import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import initRouter from './main-dependencies/router'

import {
  initGoogleMaps, initLazyLoad, initLocalization, initAuthentification, initAnalytics,
} from './main-dependencies/main-dependencies'

import App from './App'
import store from './store/index'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(ElementUI, { locale })
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_AXIOS_URL
initRouter(Vue)
initGoogleMaps(Vue)
initLazyLoad(Vue)

// eslint-disable-next-line
if (false) {
  initAuthentification(Vue, axios)
}
Vue.prototype.$auth = {
  check: () => true,
}

const i18n = initLocalization(Vue)
initAnalytics(Vue)
new Vue(Vue.util.extend({ router, store, i18n }, App)).$mount('#app')
