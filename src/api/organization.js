import request from './handler'

const list = async () => {
  const { data } = await request.get('/Organization')
  return data
}

export default {
  list
}
