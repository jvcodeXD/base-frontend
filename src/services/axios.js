import axios from 'axios'

const axiosIntance = axios.create({
  baseURL: 'http://localhost:4000/api',
})

export default axiosIntance
