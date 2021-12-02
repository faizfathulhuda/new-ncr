import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}`,
  timeout: 50000
})
const refreshInstance = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}`,
  timeout: 10000
})

const refresh = async (originalRequest) => {
  try {
    const { data } = await refreshInstance.get('/auth/admin/refresh-token', null, {
      params: {
        refresh_token: localStorage.getItem('refreshToken')
      }
    })
    localStorage.setItem('token', data.token)
    return instance({
      ...originalRequest,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    localStorage.clear()
    router.replace('/login')
    return Promise.reject(error)
  }
}

instance.interceptors.request.use(req => {
  if (req.url !== '/auth/admin/login') {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }
  return req
})

instance.interceptors.response.use(
  response => response,
  error => {
    const loginRequest = error.config.url.endsWith('/auth/admin/login')
    const unauthorized = error.response?.status === 401

    if (!loginRequest && unauthorized) {
      return refresh(error.config)
    }

    return Promise.reject(error)
  }
)

export default instance
