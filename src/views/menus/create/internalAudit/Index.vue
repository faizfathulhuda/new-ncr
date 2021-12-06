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
          :elementSMKPList="elementSMKPList"
          :auditorIsoList="auditorIsoList"
          :auditorSMKPList="auditorSMKPList"
          :auditeeList="auditeeList"
        />
      </validation-observer>
    </b-card>
    <div class="d-flex ml-3">
      <b-button class="mr-3" variant="primary" @click="save">SUBMIT</b-button>
      <b-button class="mr-3" variant="outline-primary" @click="save">SAVE</b-button>
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
      AuditorISOList: [{
        id: JSON.parse(localStorage.getItem('profile')).id,
        department: JSON.parse(localStorage.getItem('profile')).departemenName,
        name: JSON.parse(localStorage.getItem('profile')).fullname,
        siteId: JSON.parse(localStorage.getItem('profile')).workLocationId
      }],
      AuditorSMKPList: [{
        id: JSON.parse(localStorage.getItem('profile')).id,
        department: JSON.parse(localStorage.getItem('profile')).departemenName,
        name: JSON.parse(localStorage.getItem('profile')).fullname,
        siteId: JSON.parse(localStorage.getItem('profile')).workLocationId
      }],
      AuditeeSMKPList: null,
      AuditeeISOList: [null]
    },
    profile: JSON.parse(localStorage.getItem('profile')),
    ncrIsoTypeList: null,
    ncrSmkpTypeList: null,
    isoStandardList: null,
    elementSMKPList: null,
    auditorIsoList: null,
    auditorSMKPList: null,
    auditeeList: null
  }),

  created() {
    this.fetchNcrIsoTypeList()
    this.fetchNcrSmkpTypeList()
    this.fetchIsoStandardList()
    this.fetchElementList()
    this.fetchAuditorIsoList()
    this.fetchAuditorSMKPList()
    this.fetchAuditeeList()
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
    },
    async fetchElementList() {
      const { data } = await api.element.list()
      this.elementSMKPList = data.elementSMKPList
    },
    async fetchAuditorIsoList() {
      const { data } = await api.auditor.isoList({
        siteId: this.profile.workLocationId
      })
      this.auditorIsoList = data
    },
    async fetchAuditorSMKPList() {
      const { data } = await api.auditor.smkpList({
        siteId: this.profile.workLocationId
      })
      this.auditorSMKPList = data
    },
    async fetchAuditeeList() {
      const { data } = await api.auditee.list({
        auditorSiteId: this.profile.workLocationId
      })
      this.auditeeList = data
    },
    async save() {}
  }
}
</script>
<style lang="scss" scoped>
.card {
  border: none;
  border-radius: 20px;
}
</style>
