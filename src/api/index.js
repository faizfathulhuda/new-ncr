import auth from '@/api/auth'
import user from '@/api/user'
import internalAudit from './internalAudit'
import isoStandard from './isoStandard'
import element from './element'
import company from './company'
import organization from './organization'
import role from './role'
import myDocument from './myDocument'
import needMyApproval from './needMyApproval'

export default {
  auth,
  user,
  company,
  organization,
  role,
  internalAudit,
  isoStandard,
  element,
  myDocument,
  needMyApproval
}
