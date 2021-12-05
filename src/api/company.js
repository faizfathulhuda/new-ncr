import request from './handler'

const list = async () => {
  const { data } = await request.get('/company/company-list')
  return data
}

export default {
  list
}
