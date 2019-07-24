import createPersistedState from 'vuex-persistedstate'

import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'
import suppliers from './modules/suppliers'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    categories,
    suppliers,
  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
})
