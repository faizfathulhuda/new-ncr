import request from './handler'

const isoList = async form => {
  const { data } = await request.post('/auditor/auditor-iso-list', form)
  return data
}
const smkpList = async form => {
  const { data } = await request.post('/auditor/auditor-smkp-list', form)
  return data
}

export default {
  isoList,
  smkpList
}
