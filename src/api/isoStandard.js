import request from './handler'

const list = async () => {
  const { data } = await request.get('/iso-standard/iso-standard-list')
  return data
}

export default {
  list
}
