import axios from 'axios'

export default {
  sendMail(mail) {
    const uri = `${process.env.VUE_APP_API_BASE_URL}/send`
    return axios.post(uri, mail)
  },
}
