<template>
  <div>
    <div class="text-center">
      <h5>FORM CORRECTIVE ACTION DAN PREVENTIVE ACTION</h5>
    </div>
    <validation-provider name="root cause" rules="required" v-slot="{ errors }">
      <b-form-group
        label="ROOT CAUSE"
        :invalid-feedback="errors[0]"
      >
        <b-form-input
          trim
          autocapitalize="off"
          autocomplete="off"
          v-model="form.rootCause"
          placeholder="Root cause"
          :class="{ 'is-invalid': errors.length }"
        />
      </b-form-group>
    </validation-provider>
    <validation-provider name="corrective action" rules="required" v-slot="{ errors }">
      <b-form-group
        label="CORRECTIVE ACTION"
        :invalid-feedback="errors[0]"
      >
        <b-form-textarea
          id="textarea"
          v-model="form.correctiveAction"
          placeholder="Corrective action"
          rows="4"
          no-resize
          :class="{ 'is-invalid': errors.length }"
        ></b-form-textarea>
      </b-form-group>
    </validation-provider>
    <validation-provider name="preventive action" rules="required" v-slot="{ errors }">
      <b-form-group
        label="PREVENTIVE ACTION"
        :invalid-feedback="errors[0]"
      >
        <b-form-textarea
          id="textarea"
          v-model="form.preventiveAction"
          placeholder="Preventive action"
          rows="4"
          no-resize
          :class="{ 'is-invalid': errors.length }"
        ></b-form-textarea>
      </b-form-group>
    </validation-provider>
    <validation-provider name="due date" rules="required" v-slot="{ errors }">
      <b-form-group
        label="DUE DATE"
        :invalid-feedback="errors[0]"
      >
        <b-form-input
          trim
          type="date"
          autocapitalize="off"
          autocomplete="off"
          v-model="form.dueDate"
          placeholder="Select due date"
          :class="{ 'is-invalid': errors.length }"
        />
      </b-form-group>
    </validation-provider>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>

</style>
