<template>
  <div>
    <b-table
      responsive="xl"
      table-class="text-start"
      thead-tr-class="table-header"
      tbody-tr-class="table-row"
      v-bind="$attrs"
      v-on="$listeners"
      custom-prop="any"
    >
      <template v-for="(_, slotName) of $scopedSlots" :slot="slotName" slot-scope="scope">
        <slot :name="slotName" v-bind="scope"/>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  name: 'CustomTable'
}
</script>

<style lang="scss">
  .table-row {
    border-radius: 5px;
    display: table-row;
    outline: 0;
    vertical-align: middle;

    td {
      margin: 0;
      background-color: transparent;
      border: none;
      padding: 14px 0 0;
      height: 1px;
      .data {
        background-color: white;
        border-color: #F5F6F9;
        padding: 16px;
        height: 100%;
        width: 100%;
        display: inline-block;
        p {
          margin: 0;
        }
      }

      &:first-child {
        .data {
          border-top-left-radius: 25px;
          border-bottom-left-radius: 25px;
        }
      }

      &:last-child {
        .data {
          border-top-right-radius: 25px;
          border-bottom-right-radius: 25px;
        }
      }
    }
  }

  .table-header {
    border-radius: 5px;
    display: table-row;
    outline: 0;
    vertical-align: middle;

    th {
      background-color: #EDEEFD;
      padding: 0;
      margin: 0;
      border-color: #F5F6F9;
      padding: 16px;

      &:first-child {
        border-top-left-radius: 25px;
      }

      &:last-child {
        border-top-right-radius: 25px;
      }
    }
  }
</style>
