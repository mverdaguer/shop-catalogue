import axios from 'axios'

export default {
  getCategories() {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/categories`
    return axios.get(uri)
  },

  getCategory(id) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/categories/${id}/edit`
    return axios.get(uri)
  },

  createCategory(category) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/categories`
    return axios.post(uri, category)
  },

  updateCategory(category) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/categories/${category.id}`
    return axios.patch(uri, category)
  },

  deleteCategory(id) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/categories/${id}`
    return axios.delete(uri)
  },
}
