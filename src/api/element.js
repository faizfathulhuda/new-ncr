import request from './handler'

const list = async () => {
  const { data } = await request.get('/elements-smkp/elements-list')
  return data
}

export default {
  list
}
