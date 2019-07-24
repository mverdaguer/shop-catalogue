import axios from 'axios'

export default {
  getItems() {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/items`
    return axios.get(uri)
  },

  deleteItem(id) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/items/${id}`
    return axios.delete(uri)
  },

  addItem(item) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/items`
    return axios.post(uri, item)
  },

  getItem(id) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/items/${id}/edit`
    return axios.get(uri)
  },

  updateItem(item) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/items/${item.id}`
    return axios.patch(uri, item)
  },
}
