import request from './handler'

const me = id => request.get(`/management-user/users/${id}`)
const list = form => request.post('/management-user/users-list', form)
const role = id => request.get(`/management-user/user-roles/${id}`)
export default {
  me,
  list,
  role
}
