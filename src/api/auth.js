import request from './handler'

const login = form => request.post('/auth/login', form)
const logout = form => request.post('/auth/logout', form)

export default {
  login,
  logout
}
