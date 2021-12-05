<template>
  <div class="mb-5">
    <validation-observer ref="form" slim>
      <b-card class="wrapper shadow p-3 mb-4">
        <Form :form="form" :isView="false" :isEdit="false" />
      </b-card>
      <div class="d-flex align-items-center mb-3">
        <h5 class="pl-3 mb-0 mr-2">Create Corrective Action (CA) dan Preventive Action (PA) Plan</h5>
        <b-button
          class="rounded-circle"
          variant="light"
          @click="changeIcon"
          v-b-toggle.collapse-1
        >
          <b-icon :icon="icon" />
        </b-button>
      </div>
      <b-collapse id="collapse-1">
        <b-card class="wrapper shadow p-3 mb-5">
          <CapaPlan :form="form" :isView="false" :isEdit="false" />
        </b-card>
      </b-collapse>
    </validation-observer>
    <div class="d-flex ml-3">
      <b-button class="mr-3" variant="primary">SUBMIT</b-button>
      <b-button class="mr-3" variant="outline-primary">SAVE</b-button>
      <b-button class="mr-3" variant="outline-primary">PRINT</b-button>
      <b-button variant="outline-danger">CLOSE</b-button>
    </div>
  </div>
</template>

<script>
import Form from './Form.vue'
import CapaPlan from './CapaPlan.vue'

export default {
  components: {
    Form,
    CapaPlan
  },

  data: () => ({
    form: {
      isoStandard: null,
      isoType: null,
      isoClause: [null],
      evidence: [],
      referenceIso: [null],
      auditorIso: [null],
      auditorIsoDiv: [null],
      auditee: [null],
      auditeeDiv: [null]
    },
    icon: 'caret-right-fill'
  }),

  methods: {
    changeIcon() {
      this.icon = this.icon === 'caret-right-fill' ? 'caret-down-fill' : 'caret-right-fill'
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
