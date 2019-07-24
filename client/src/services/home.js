import axios from 'axios'

export default {
  getImages() {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/home_images`
    return axios.get(uri)
  },

  deleteImage(name) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/home_images/${name}`
    return axios.delete(uri)
  },

  addImage(path) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/home_images`
    return axios.post(uri, path)
  },
}
