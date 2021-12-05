import request from './handler'

const me = id => request.get(`/management-user/users/${id}`)
const list = async form => {
  const { data } = await request.post('/management-user/users-list', form)
  return data
}
const role = id => request.get(`/management-user/user-roles/${id}`)
export default {
  me,
  list,
  role
}
