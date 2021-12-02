import request from './handler'

const login = form => request.post('/auth/login', form)

const logout = () => request.post('/auth/logout')

export default {
  login,
  logout
}
