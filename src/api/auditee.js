import request from './handler'

const list = async form => {
  const { data } = await request.post('/auditee/auditee-list', form)
  return data
}

export default {
  list
}
