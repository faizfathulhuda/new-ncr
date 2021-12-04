<template>
  <div class="mb-5">
    <b-card class="wrapper shadow p-3 mb-5">
      <validation-observer ref="form" slim>
        <Form :form="form" :isView="false" :isEdit="false" />
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
import Form from './Form.vue'
export default {
  components: {
    Form
  },

  data: () => ({
    form: {
      isoStandard: null,
      isoType: null,
      smkpType: null,
      isoClause: [null],
      evidence: [],
      referenceIso: [null],
      auditorIso: [null],
      auditorIsoDiv: [null],
      auditorSmkp: [null],
      auditorSmkpDiv: [null],
      auditee: [null],
      auditeeDiv: [null]
    }
  })
}
</script>
<style lang="scss" scoped>
.card {
  border: none;
  border-radius: 20px;
}
</style>
