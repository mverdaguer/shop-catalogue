import * as VueGoogleMaps from 'vue2-google-maps'
import VueLazyload from 'vue-lazyload'
import VueI18n from 'vue-i18n'
import VueAnalytics from 'vue-analytics'

const auth = require('@websanova/vue-auth')
const bearer = require('@websanova/vue-auth/drivers/auth/bearer.js')
const httpAxios = require('@websanova/vue-auth/drivers/http/axios.1.x.js')
const vueRouter = require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
const caLocale = require('@/locales/ca.json')
const enLocale = require('@/locales/en.json')
const svgLoading = require('@/assets/loading.svg')

function initGoogleMaps(Vue) {
  Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.VUE_APP_GOOGLE_MAPS_KEY,
      libraries: 'places', // This is required if you use the Autocomplete plugin
      // OR: libraries: 'places,drawing'
      // OR: libraries: 'places,drawing,visualization'
      // (as you require)
    },
  })
}

function initLazyLoad(Vue) {
  Vue.use(VueLazyload, {
    preLoad: 1.3,
    loading: svgLoading,
    attempt: 1,
    lazyComponent: true,
  })
}

function initLocalization(Vue) {
  Vue.use(VueI18n)

  const messages = {
    en: enLocale,
    'ca-ES': caLocale
  }

  return new VueI18n({
    locale: navigator.language,
    fallbackLocale: 'en',
    messages,
  })
}

function initAuthentification(Vue, axios) {
  axios.defaults.withCredentials = true

  Vue.use(auth, {
    auth: bearer,
    http: httpAxios,
    router: vueRouter,
  })

  axios.interceptors.response.use(config => config, (err) => {
    if (err.response.data.error === 'token_expired') {
      Vue.auth.logout({
        redirect: { name: 'login' },
      })
    } else {
      return Promise.reject(err)
    }
  })
}

function initAnalytics(Vue) {
  const { router } = global

  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_API_ANALYTICS,
    router,
  })
}

export {
  initGoogleMaps, initLazyLoad, initLocalization, initAuthentification, initAnalytics,
}
