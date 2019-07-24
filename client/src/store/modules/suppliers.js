import * as types from '../mutation-types'
import SupplierService from '@/services/suppliers'

const getters = {
  allSuppliers: state => state.all,
}

const actions = {
  fetchSuppliers({ commit }) {
    SupplierService.getSuppliers().then((response) => {
      const suppliers = response.data
      commit(types.FETCH_SUPPLIERS, { suppliers })
    })
  },

  createSupplier({ commit }, supplier) {
    SupplierService.createSupplier(supplier).then(() => {
      commit(types.CREATE_SUPPLIER, { supplier })
      router.push({ name: 'DisplaySupplier' })
    })
  },

  deleteSupplier({ commit }, id) {
    SupplierService.deleteSupplier(id).then(() => {
      commit(types.DELETE_SUPPLIER, { id })
    })
  },
}

const mutations = {
  [types.FETCH_SUPPLIERS](state, { suppliers }) {
    state.all = suppliers
  },

  [types.CREATE_SUPPLIER](state, { supplier }) {
    state.all.push(supplier)
  },

  [types.DELETE_SUPPLIER](state, { id }) {
    state.all = state.all.filter(element => element.id !== id)
  },
}

const state = {
  all: [],
}

export default {
  state,
  getters,
  actions,
  mutations,
}
