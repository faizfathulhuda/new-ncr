import request from './handler'

const list = async () => {
  const { data } = await request.get('/role')
  return data
}

export default {
  list
}
