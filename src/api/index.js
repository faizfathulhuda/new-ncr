import auth from '@/api/auth'
import user from '@/api/user'
import request from '@/api/handler'

const companyList = () => request.get('/company/company-list')
const organizationList = () => request.get('/Organization')
const roleList = () => request.get('/role')

export default {
  auth,
  user,
  companyList,
  organizationList,
  roleList
}
