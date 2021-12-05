import request from './handler'

const ncrTypeIso = async () => {
  const { data } = await request.get('/internalAudit/ncr-types-iso')
  return data
}
const ncrTypeSmkp = async () => {
  const { data } = await request.get('/internalAudit/ncr-types-smkp')
  return data
}
const save = form => request.post('/api/internalAudit/save-ncr', form)

export default {
  ncrTypeIso,
  ncrTypeSmkp,
  save
}
