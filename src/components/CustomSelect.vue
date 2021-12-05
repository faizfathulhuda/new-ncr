<template>
  <b-form-group
      class="style-group"
      :label="label"
      :label-for="labelId"
  >
    <v-select
      v-bind="$attrs"
      v-on="$listeners"
      custom-prop="any"
      :id="labelId"
      class="style-select"
      multiple
    ></v-select>
  </b-form-group>
</template>
<script>
import VSelect from 'vue-select'

export default {
  name: 'CustomSelect',
  components: { VSelect },
  props: {
    label: String
  },
  data() {
    return {
      labelId: (Math.random().toString(36) + Date.now().toString(36)).substr(15)
    }
  }
}
</script>
<style lang="scss">
.style-group {
  label {
    text-transform: uppercase;
    font-weight: 700;
  }
}

.vs--open {
  .vs__dropdown-toggle {
    border-color: #e7e8fd !important;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(115, 122, 241, 0.25);
  }
}

.style-select {
  .vs__dropdown-toggle {
    border-color: #ced4da;
    border-radius: 0.25rem;
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    transition: background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

    .vs__selected-options {
      min-height: calc(1.5em + 0.75rem + 2px);
      padding: 0.375rem 0.75rem;

      input {
        padding: 0;
      }

      .vs__selected {
        color: #6979F8;
        background-color: #EDEEFD;
        padding: 2px 8px;
        border: none;

        .vs__deselect {
          margin-left: 6px;
        }
      }
    }

    .vs__actions {
      padding-top: 0.375rem;
      padding-right: 1rem;

      svg {
        fill: rgba(0, 0, 0, 0.4);
      }
    }
  }

  .vs__dropdown-menu {
    top: calc(100% - 2px);
    border-radius: 0 0 0.25rem 0.25rem;
    border-color: rgba(206, 212, 218, 0.26);
    padding: 8px 0;

    .vs__dropdown-option {
      margin: 12px;
      font-size: 1rem;
      line-height: 1rem;
      padding: 6px 16px;

      &--selected {
        background: #EDEEFD !important;
        color: rgba(0, 0, 0, 0.67) !important;
      }

      &--highlight {
        background: #A2A6F6;
        color: #FFF;
      }
    }
  }
}
</style>
