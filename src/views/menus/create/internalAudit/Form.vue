<template>
  <div>
    <div class="d-flex align-items mb-4">
      <span class="text-uppercase font-weight-bold">ncr source</span>
      <b-form-checkbox
        class="ml-4"
        v-model="form.iso"
      >
        Internal Audit ISO
      </b-form-checkbox>
      <b-form-checkbox
        class="ml-4"
        v-model="form.smkp"
      >
        Internal Audit SMKP
      </b-form-checkbox>
    </div>
    <b-row class="mb-3">
      <b-col v-if="form.iso || form.smkp">
        <span class="text-uppercase font-weight-bold">ncr number</span>
        <b-card>
          <b-row>
            <b-col v-if="form.iso">
              <b-form-group
                label="NCR Number Internal Audit ISO"
              >
                <b-form-input
                  v-model="form.isotext"
                  placeholder="NCR Number Internal Audit ISO"
                  disabled
                  trim
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col v-if="form.smkp">
              <b-form-group
                label="NCR Number Internal SMKP"
              >
                <b-form-input
                  v-model="form.smkptext"
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
                    v-model="form.startDate"
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
                    v-model="form.endDate"
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
        v-model="form.site"
        disabled
        trim
      >
      </b-form-input>
    </b-form-group>
    <span class="text-uppercase font-weight-bold">ncr type</span>
    <b-row>
      <b-col v-if="form.iso">
        <validation-provider name="NCR Type ISO" rules="required" v-slot="{ errors }">
          <b-form-group
            label-class="text-uppercase font-weight-bold"
            :invalid-feedback="errors[0]"
          >
            <b-form-select
              v-model="form.isoType"
              :options="options"
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
      <b-col v-if="form.smkp">
        <validation-provider name="NCR Type SMKP" rules="required" v-slot="{ errors }">
          <b-form-group
            label-class="text-uppercase font-weight-bold"
            :invalid-feedback="errors[0]"
          >
            <b-form-select
              v-model="form.smkpType"
              :options="options"
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
      <b-col v-if="!form.iso && !form.smkp" class="mb-3 text-danger">Please choose NCR Source</b-col>
    </b-row>
    <validation-provider name="detail of nonconformance" rules="required" v-slot="{ errors }">
      <b-form-group
        label="detail of nonconformance"
        label-class="text-uppercase font-weight-bold"
        :invalid-feedback="errors[0]"
      >
        <b-form-textarea
          id="textarea"
          v-model="form.detail"
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
          v-model="form.location"
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
        :disabled="form.evidence.length === 3"
      ></b-form-file>
    </b-form-group>
    <b-alert :show="!!errorFile" variant="danger" dismissible>{{ errorFile }}</b-alert>
    <div class="d-flex justify-content-around">
      <div v-for="(item, idx) of form.evidence" class="w-25 mr-1 mb-1 d-flex flex-column" :key="idx">
        <b-icon icon="x" variant="light" class="rounded-circle bg-danger align-self-end pointer" @click="deleteFile(item.id)"/>
        <b-img thumbnail fluid class="h-100" :src="item.file.type.includes('image') ? item.fileTarget : defaultImage"/>
        <span>{{ item.file.name }}</span>
      </div>
    </div>
    <div v-if="form.iso">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">REFERENCE ISO</span>
        <b-button variant="primary" size="sm" @click="addReferenceIso">ADD +</b-button>
      </div>
      <b-row v-for="(item, i) of form.referenceIso" :key="i">
        <b-col>
          <validation-provider name="Reference ISO" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.referenceIso[i]"
                label="text"
                :options="options"
                :reduce="({ value }) => value"
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
                v-model="form.isoClause[i]"
                label="text"
                :options="options"
                :reduce="({ value }) => value"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col
          v-if="form.referenceIso.length > 1"
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
    <div v-if="form.smkp">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">REFERENCE SMKP</span>
      </div>
      <b-row>
        <b-col>
          <validation-provider name="Reference ISO" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.referenceIso[0]"
                label="text"
                :options="options"
                :reduce="({ value }) => value"
                :disabled="isView"
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
                v-model="form.subElement"
                label="text"
                :options="options"
                :reduce="({ value }) => value"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>
    </div>
    <div v-if="form.iso">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">AUDITOR ISO</span>
        <b-button variant="primary" size="sm" @click="addAuditorIso">ADD +</b-button>
      </div>
      <b-row v-for="(item, i) of form.auditorIso" :key="i">
        <b-col>
          <validation-provider name="Auditor ISO" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.auditorIso[i]"
                label="text"
                :options="options"
                :reduce="({ value }) => value"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-input
              v-model="form.isotext"
              placeholder="Division/Department"
              disabled
              trim
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col
          v-if="form.auditorIso.length > 1"
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
    <div v-if="form.smkp">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">AUDITOR SMKP</span>
        <b-button variant="primary" size="sm" @click="addAuditorSmkp">ADD +</b-button>
      </div>
      <b-row v-for="(item, i) of form.auditorSmkp" :key="i">
        <b-col>
          <validation-provider name="Auditor SMKP" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.auditorSmkp[i]"
                label="text"
                :options="options"
                :reduce="({ value }) => value"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-input
              v-model="form.isotext"
              placeholder="Division/Department"
              disabled
              trim
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col
          v-if="form.auditorSmkp.length > 1"
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
    <div v-if="form.iso || form.smkp">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <span class="font-weight-bold">AUDITEE</span>
        <b-button variant="primary" size="sm" @click="addAuditee">ADD +</b-button>
      </div>
      <b-row v-for="(item, i) of form.auditee" :key="i">
        <b-col>
          <validation-provider name="Reference ISO" rules="required" v-slot="{ errors }">
            <b-form-group
              :invalid-feedback="errors[0]"
            >
              <v-select
                v-model="form.auditee[i]"
                label="text"
                :options="options"
                :reduce="({ value }) => value"
                :disabled="isView"
                :class="{ 'is-invalid': errors.length }"
              />
            </b-form-group>
          </validation-provider>
        </b-col>
        <b-col>
          <b-form-group>
            <b-form-input
              v-model="form.isotext"
              placeholder="Division/Department"
              disabled
              trim
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col
          v-if="form.auditee.length > 1"
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
    errorFile: ''
  }),

  methods: {
    async onFilePicked(ev) {
      const input = ev.length ? ev : ev.target.files
      if ((this.form.evidence.length + input.length) < 4) {
        console.log(input)
        for (const file of input) {
          const itemIds = this.form.evidence.length ? this.form.evidence.map(({ id }) => id) : [0]
          const fileId = Math.max(...itemIds) + 1
          this.form.evidence.push({
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
      const fileIndex = this.form.evidence.findIndex(v => v.id === id)
      this.form.evidence.splice(fileIndex, 1)
    },
    formatNames() {
      return `${this.form.evidence.length} file(s) selected`
    },
    addReferenceIso() {
      this.form.referenceIso.push(null)
      this.form.isoClause.push(null)
    },
    removeReferenceIso(index) {
      this.form.referenceIso.splice(index, 1)
      this.form.isoClause.splice(index, 1)
    },
    addAuditorIso() {
      this.form.auditorIso.push(null)
      this.form.auditorIsoDiv.push(null)
    },
    removeAuditorIso(index) {
      this.form.auditorIso.splice(index, 1)
      this.form.auditorIsoDiv.splice(index, 1)
    },
    addAuditorSmkp() {
      this.form.auditorSmkp.push(null)
      this.form.auditorSmkpDiv.push(null)
    },
    removeAuditorSmkp(index) {
      this.form.auditorSmkp.splice(index, 1)
      this.form.auditorSmkpDiv.splice(index, 1)
    },
    addAuditee() {
      this.form.auditee.push(null)
      this.form.auditeeDiv.push(null)
    },
    removeAuditee(index) {
      this.form.auditee.splice(index, 1)
      this.form.auditeeDiv.splice(index, 1)
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
