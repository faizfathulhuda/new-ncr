import request from './handler'

const list = async form => {
  const { data } = await request.post('/my-document/ncr-list', form)
  return data
}

export default {
  list
}
