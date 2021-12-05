<template>
  <div class="mb-5">
    <b-card class="wrapper shadow p-3 mb-5">
      <validation-observer ref="form" slim>
        <Form
          :form="form"
          :isView="false"
          :isEdit="false"
          :profile="profile"
          :ncrIsoTypeList="ncrIsoTypeList"
          :ncrSmkpTypeList="ncrSmkpTypeList"
          :isoStandardList="isoStandardList"
        />
      </validation-observer>
    </b-card>
    <div class="d-flex ml-3">
      <b-button class="mr-3" variant="primary">SUBMIT</b-button>
      <b-button class="mr-3" variant="outline-primary">SAVE</b-button>
      <b-button class="mr-3" variant="outline-primary">PRINT</b-button>
      <b-button variant="outline-danger">CLOSE</b-button>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import Form from './Form.vue'
export default {
  components: {
    Form
  },

  data: () => ({
    form: {
      UserRequestId: JSON.parse(localStorage.getItem('profile')).id,
      IsIso: false,
      IsSMKP: false,
      DateStart: null,
      DateEnd: null,
      SiteId: JSON.parse(localStorage.getItem('profile')).workLocationId,
      IsoType: null,
      SMKPType: null,
      ProblemDesc: null,
      Location: null,
      FileNCRList: [],
      ISOClauseList: [null],
      SubElementRequestList: [null],
      AuditorISOList: [null],
      AuditorSMKPList: [null],
      AuditeeSMKPList: [null],
      AuditeeISOList: [null],
      isoStandard: null,
      referenceIso: [null],
      auditorIso: [null],
      auditorIsoDiv: [null],
      auditorSmkp: [null],
      auditorSmkpDiv: [null],
      auditee: [null],
      auditeeDiv: [null]
    },
    profile: JSON.parse(localStorage.getItem('profile')),
    ncrIsoTypeList: null,
    ncrSmkpTypeList: null,
    isoStandardList: null
  }),

  created() {
    this.fetchNcrIsoTypeList()
    this.fetchNcrSmkpTypeList()
    this.fetchIsoStandardList()
  },

  methods: {
    async fetchNcrIsoTypeList() {
      const { data } = await api.internalAudit.ncrTypeIso()
      this.ncrIsoTypeList = data.ncrTypes
    },
    async fetchNcrSmkpTypeList() {
      const { data } = await api.internalAudit.ncrTypeSmkp()
      this.ncrSmkpTypeList = data.ncrTypes
    },
    async fetchIsoStandardList() {
      const { data } = await api.isoStandard.list()
      this.isoStandardList = data.isoStandards
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  border: none;
  border-radius: 20px;
}
</style>
