<template>
  <div>
    <div class="d-flex align-items mb-4">
      <span class="text-uppercase font-weight-bold">ncr source</span>
      <b-form-checkbox
        class="ml-4"
        v-model="form.IsIso"
      >
        Internal Audit ISO
      </b-form-checkbox>
      <b-form-checkbox
        class="ml-4"
        v-model="form.IsSMKP"
      >
        Internal Audit SMKP
      </b-form-checkbox>
    </div>
    <b-row class="mb-3">
      <b-col v-if="form.IsIso || form.IsSMKP">
        <span class="text-uppercase font-weight-bold">ncr number</span>
        <b-card>
          <b-row>
            <b-col v-if="form.IsIso">
              <b-form-group
                label="NCR Number Internal Audit ISO"
              >
                <b-form-input
                  placeholder="NCR Number Internal Audit ISO"
                  disabled
                  trim
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col v-if="form.IsSMKP">
              <b-form-group
                label="NCR Number Internal SMKP"
              >
                <b-form-input
                  placeholder="NCR Number Internal SMKP"
                  disabled
                  trim
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <b-col>
        <span class="text-uppercase font-weight-bold">ncr number</span>
        <b-card>
          <b-row>
            <b-col>
              <validation-provider name="Start Date" rules="required" v-slot="{ errors }">
                <b-form-group
                  label="Start Date"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    trim
                    type="date"
                    autocapitalize="off"
                    autocomplete="off"
                    v-model="form.DateEnd"
                    placeholder="Select start date"
                    :class="{ 'is-invalid': errors.length }"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>
            <b-col>
              <validation-provider name="End Date" rules="required" v-slot="{ errors }">
                <b-form-group
                  label="End Date"
                  :invalid-feedback="errors[0]"
                >
                  <b-form-input
                    trim
                    type="date"
                    autocapitalize="off"
                    autocomplete="off"
                    v-model="form.DateStart"
                    placeholder="Select end date"
                    :class="{ 'is-invalid': errors.length }"
                  />
                </b-form-group>
              </validation-provider>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-form-group
      label="site"
      label-class="text-uppercase font-weight-bold"
    >
      <b-form-input
        :value="profile.organization"
        disabled
        trim
      >
      </b-form-input>
    </b-form-group>
    <span class="text-uppercase font-weight-bold">ncr type</span>
    <b-row>
      <b-col v-if="form.IsIso">
        <validation-provider name="NCR Type ISO" rules="required" v-slot="{ errors }">
          <b-form-group
            label-class="text-uppercase font-weight-bold"
            :invalid-feedback="errors[0]"
          >
            <b-form-select
              v-model="form.IsoType"
              :options="ncrIsoTypeList"
              :class="{ 'is-invalid': errors.length }"
            >
              <template #first>
                <b-form-select-option
                  :value="null"
                  disabled
                >
                  Internal Audit ISO
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </validation-provider>
      </b-col>
      <b-col v-if="form.IsSMKP">
        <validation-provider name="NCR Type SMKP" rules="required" v-slot="{ errors }">
          <b-form-group
            label-class="text-uppercase font-weight-bold"
            :invalid-feedback="errors[0]"
          >
            <b-form-select
              v-model="form.SMKPType"
              :options="ncrSmkpTypeList"
              :class="{ 'is-invalid': errors.length }"
            >
              <template #first>
                <b-form-select-option
                  :value="null"
                  disabled
                >
                  Internal Audit SMKP
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
        </validation-provider>
      </b-col>
      <b-col v-if="!form.IsIso && !form.IsSMKP" class="mb-3 text-danger">Please choose NCR Source</b-col>
    </b-row>
    <validation-provider name="detail of nonconformance" rules="required" v-slot="{ errors }">
      <b-form-group
        label="detail of nonconformance"
        label-class="text-uppercase font-weight-bold"
        :invalid-feedback="errors[0]"
      >
        <b-form-textarea
          id="textarea"
          v-model="form.ProblemDesc"
          placeholder="Problem description"
          rows="4"
          no-resize
          :class="{ 'is-invalid': errors.length }"
        ></b-form-textarea>
      </b-form-group>
    </validation-provider>
    <validation-provider name="Location of nonconformance" rules="required" v-slot="{ errors }">
      <b-form-group
        :invalid-feedback="errors[0]"
      >
        <b-form-input
          trim
          autocapitalize="off"
          autocomplete="off"
          v-model="form.Location"
          placeholder="Location of nonconformance"
          :class="{ 'is-invalid': errors.length }"
        />
      </b-form-group>
    </validation-provider>
    <b-form-group
      label="nonconformance objective evidence"
      label-class="text-uppercase font-weight-bold"
    >
      <b-form-file
        multiple
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        :file-name-formatter="formatNames"
        @input="onFilePicked"
        accept="image/*, .pdf"
        :disabled="form.FileNCRList.length === 3"
      ></b-form-file>
    </b-form-group>
    <b-alert :show="!!errorFile" variant="danger" dismissible>{{ errorFile }}</b-alert>
    <div class="d-flex justify-content-around">
      <div v-for="(item, idx) of form.FileNCRList" class="w-25 mr-1 mb-1 d-flex flex-column" :key="idx">
        <b-icon icon="x" variant="light" class="rounded-circle bg-danger align-self-end pointer" @click="deleteFile(item.id)"/>
        <b-img thumbnail fluid class="h-100" :src="item.file.type.includes('image') ? item.fileTarget : defaultImage"/>
        <span>{{ item.file.name }}</span>
      </div>
    </div>
    <div v-if="form.IsIso">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">REFERENCE ISO</span>
        <b-button variant="primary" size="sm" @click="addReferenceIso">ADD +</b-button>
      </div>
      <b-row v-for="(item, i) of referenceIso" :key="i">
        <b-col>
          <validation-provider name="Reference ISO" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="referenceIso[i]"
                label="title"
                :options="isoStandardList"
                :reduce="({ id }) => id"
                @input="onIsoStandardChange($event, i)"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider name="ISO Clause" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.ISOClauseList[i]"
                label="title"
                :options="listIsoClause[i]"
                :reduce="({ id }) => id"
                :disabled="listIsoClause[i].length === 0"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col
          v-if="referenceIso.length > 1"
          cols="1"
          class="d-flex justify-content-center pt-2"
        >
          <b-icon
            font-scale="1.2"
            icon="x"
            variant="light"
            class="rounded-circle bg-danger pointer"
            @click="removeReferenceIso(i)"
          />
        </b-col>
      </b-row>
    </div>
    <div v-if="form.IsSMKP">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">REFERENCE SMKP</span>
      </div>
      <b-row>
        <b-col>
          <validation-provider name="Reference SMKP" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="referenceSmkp[0]"
                label="title"
                :options="elementSMKPList"
                :reduce="({ id }) => id"
                :disabled="isView"
                @input="onSMKPSElementChange"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <validation-provider name="Sub-Element" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.SubElementRequestList[0]"
                label="title"
                :options="listSubElement"
                :reduce="({ id }) => id"
                :disabled="listSubElement.length === 0"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>
    </div>
    <div v-if="form.IsIso">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">AUDITOR ISO</span>
        <b-button variant="primary" size="sm" @click="addAuditorIso">ADD +</b-button>
      </div>
      <b-row v-for="(item, i) of form.AuditorISOList" :key="i">
        <b-col>
          <validation-provider name="Auditor ISO" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.AuditorISOList[i]"
                label="name"
                :options="auditorIsoList"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-input
              :value="i === 0 ? profile.departemenName : form.AuditorISOList[i] ? form.AuditorISOList[i].departemen : 'Division/Department'"
              placeholder="Division/Department"
              disabled
              trim
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col
          v-if="form.AuditorISOList.length > 1"
          cols="1"
          class="d-flex justify-content-center pt-2"
        >
          <b-icon
            font-scale="1.2"
            icon="x"
            variant="light"
            class="rounded-circle bg-danger pointer"
            @click="removeAuditorIso(i)"
          />
        </b-col>
      </b-row>
    </div>
    <div v-if="form.IsSMKP">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">AUDITOR SMKP</span>
        <b-button variant="primary" size="sm" @click="addAuditorSmkp">ADD +</b-button>
      </div>
      <b-row v-for="(item, i) of form.AuditorSMKPList" :key="i">
        <b-col>
          <validation-provider name="Auditor SMKP" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.AuditorSMKPList[i]"
                label="name"
                :options="auditorSMKPList"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-input
              :value="i === 0 ? profile.departemenName : form.AuditorSMKPList[i] ? form.AuditorSMKPList[i].departemen : 'Division/Department'"
              placeholder="Division/Department"
              disabled
              trim
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col
          v-if="form.AuditorSMKPList.length > 1"
          cols="1"
          class="d-flex justify-content-center pt-2"
        >
          <b-icon
            font-scale="1.2"
            icon="x"
            variant="light"
            class="rounded-circle bg-danger pointer"
            @click="removeAuditorSmkp(i)"
          />
        </b-col>
      </b-row>
    </div>
    <div v-if="form.IsIso || form.IsSMKP">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">AUDITEE</span>
        <b-button variant="primary" size="sm" @click="addAuditee">ADD +</b-button>
      </div>
      <b-row v-for="(item, i) of form.AuditeeISOList" :key="i">
        <b-col>
          <validation-provider name="Auditee" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.AuditeeISOList[i]"
                label="name"
                :options="auditeeList"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-input
              :value="form.AuditeeISOList[i] ? form.AuditeeISOList[i].departemen : 'Division/Department'"
              placeholder="Division/Department"
              disabled
              trim
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col
          v-if="form.AuditeeISOList.length > 1"
          cols="1"
          class="d-flex justify-content-center pt-2"
        >
          <b-icon
            font-scale="1.2"
            icon="x"
            variant="light"
            class="rounded-circle bg-danger pointer"
            @click="removeAuditee(i)"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import noImage from '@/assets/no-image.svg'
import VSelect from 'vue-select'

export default {
  props: {
    isView: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => ({})
    },
    profile: {
      type: Object,
      default: () => ({})
    },
    ncrIsoTypeList: {
      type: Array,
      default: () => ([])
    },
    ncrSmkpTypeList: {
      type: Array,
      default: () => ([])
    },
    isoStandardList: {
      type: Array,
      default: () => ([])
    },
    elementSMKPList: {
      type: Array,
      default: () => ([])
    },
    auditorIsoList: {
      type: Array,
      default: () => ([])
    },
    auditorSMKPList: {
      type: Array,
      default: () => ([])
    },
    auditeeList: {
      type: Array,
      default: () => ([])
    }
  },

  components: {
    VSelect
  },

  data: () => ({
    options: [
      { value: null, text: 'Please select an option' },
      { value: 'a', text: 'This is First option' },
      { value: 'b', text: 'Selected Option' },
      { value: { C: '3PO' }, text: 'This is an option with object value' },
      { value: 'd', text: 'This one is disabled', disabled: true }
    ],
    defaultImage: noImage,
    errorFile: '',
    listIsoClause: [[]],
    listSubElement: [],
    referenceIso: [null],
    referenceSmkp: [null]
  }),

  methods: {
    async onFilePicked(ev) {
      const input = ev.length ? ev : ev.target.files
      if ((this.form.FileNCRList.length + input.length) < 4) {
        for (const file of input) {
          const itemIds = this.form.FileNCRList.length ? this.form.FileNCRList.map(({ id }) => id) : [0]
          const fileId = Math.max(...itemIds) + 1
          this.form.FileNCRList.push({
            id: fileId,
            file: file,
            fileTarget: URL.createObjectURL(file)
          })
        }
      } else {
        this.errorFile = 'The nonconformance objective evidence may not be greater than 3 files'
      }
    },
    deleteFile(id) {
      const fileIndex = this.form.FileNCRList.findIndex(v => v.id === id)
      this.form.FileNCRList.splice(fileIndex, 1)
    },
    formatNames() {
      return `${this.form.FileNCRList.length} file(s) selected`
    },
    addReferenceIso() {
      this.form.ISOClauseList.push(null)
      this.referenceIso.push(null)
      this.listIsoClause.push([])
    },
    removeReferenceIso(index) {
      this.form.ISOClauseList.splice(index, 1)
      this.referenceIso.splice(index, 1)
      this.listIsoClause.splice(index, 1)
    },
    onIsoStandardChange(id, i) {
      if (id) {
        const index = this.isoStandardList.findIndex(v => v.id === id)
        this.listIsoClause[i] = this.isoStandardList[index].clauseList
      } else {
        this.listIsoClause[i] = []
        this.form.ISOClauseList[i] = null
      }
    },
    addAuditorIso() {
      this.form.AuditorISOList.push(null)
    },
    removeAuditorIso(index) {
      this.form.AuditorISOList.splice(index, 1)
    },
    onSMKPSElementChange(id) {
      if (id) {
        const index = this.elementSMKPList.findIndex(v => v.id === id)
        this.listSubElement = this.elementSMKPList[index].subElementList
      } else {
        this.listSubElement = []
      }
    },
    addAuditorSmkp() {
      this.form.AuditorSMKPList.push(null)
    },
    removeAuditorSmkp(index) {
      this.form.AuditorSMKPList.splice(index, 1)
    },
    addAuditee() {
      this.form.AuditeeISOList.push(null)
    },
    removeAuditee(index) {
      this.form.AuditeeISOList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-file {
  color: #4895EF;
  background-color: #EDEEFD;
}
</style>
