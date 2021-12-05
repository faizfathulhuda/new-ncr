import request from './handler'

const list = async form => {
  const { data } = await request.post('/need-my-approval/list', form)
  return data
}

export default {
  list
}
