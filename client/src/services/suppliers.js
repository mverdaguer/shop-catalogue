import axios from 'axios'

export default {
  getSuppliers() {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/suppliers`
    return axios.get(uri)
  },

  getSupplier(id) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/suppliers/${id}/edit`
    return axios.get(uri)
  },

  createSupplier(supplier) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/suppliers`
    return axios.post(uri, supplier)
  },

  updateSupplier(supplier) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/suppliers/${supplier.id}`
    return axios.patch(uri, supplier)
  },

  deleteSupplier(id) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/suppliers/${id}`
    return axios.delete(uri)
  },
}
