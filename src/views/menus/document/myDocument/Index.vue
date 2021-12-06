<template>
  <div>
    <b-row class="mb-4">
      <b-col lg="12" class="my-1">
        <b-card no-body class="mb-1">
          <b-card-header class="bg-white border-0">
            <b-link
              block
              v-b-toggle.my-document
              variant="info"
              class="font-weight-bold text-decoration-none text-dark"
            >
              Filter
            </b-link>
          </b-card-header>
          <b-collapse id="my-document" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col lg="3">
                  <custom-select
                    label="Year"
                    placeholder="Filter by Year"
                    v-model="filter.year"
                    @input="$refs.table.$refs.table.refresh()"
                    :options="options.year"
                  />
                </b-col>
                <b-col lg="3">
                  <custom-select
                    label="Source"
                    placeholder="Filter by Source"
                    v-model="filter.source"
                    @input="$refs.table.$refs.table.refresh()"
                    :options="options.source"
                  />
                </b-col>
                <b-col lg="3">
                  <custom-select
                    label="Status"
                    placeholder="Filter by Status"
                    v-model="filter.status"
                    @input="$refs.table.$refs.table.refresh()"
                    :options="options.status"
                  />
                </b-col>
                <b-col lg="3">
                  <custom-select
                    label="Type"
                    placeholder="Filter by Type"
                    v-model="filter.type"
                    @input="$refs.table.$refs.table.refresh()"
                    :options="options.type"
                  />
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>

    <custom-table
      :items="fetchDocuments"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      ref="table"
    >
      <template v-slot:table-busy>
        <div class="text-center my-4">
          <b-spinner
            variant="primary"
            class="spinner-lg"
          />
        </div>
      </template>

      <template #cell(action)="row">
        <div class="data">
          <b-link v-b-modal.modal-prevent-closing @click="showModal(row.item)" class="text-secondary">
            <b-icon icon="pencil-fill"></b-icon>
          </b-link>
        </div>
      </template>

      <template #cell(doc)="row">
        <div class="data">
          <b-link v-b-modal.modal-prevent-closing @click="showModal(row.item)" class="text-secondary">
            <b-icon icon="link45deg"></b-icon>
          </b-link>
        </div>
      </template>

      <template #cell(role)="row">
        <div class="data">
          <p v-for="role in row.value" :key="role">
            {{ role }}
          </p>
        </div>
      </template>

      <template #cell()="row">
        <div class="data">{{ row.value }}</div>
      </template>
    </custom-table>

    <b-row>
      <b-col lg="3">
        <div>
          <b>
            Showing {{ this.currentPage * this.perPage - (this.perPage - 1) }}
            to {{ (this.currentPage * this.perPage) >= this.totalRows ? this.totalRows : (this.currentPage * this.perPage) }}
            of {{ this.totalRows }} data entries
          </b>
        </div>
      </b-col>
      <b-col offset="6" lg="3" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CustomTable from '@/components/CustomTable'
import CustomSelect from '@/components/CustomSelect'
import api from '@/api'

export default {
  components: {
    CustomTable,
    CustomSelect
  },
  data() {
    return {
      itemModal: {},
      options: {
        year: [],
        source: [],
        status: [],
        type: []
      },
      filter: {
        year: [],
        source: [],
        status: [],
        type: []
      },
      keyword: '',
      items: [],
      fields: [
        { key: 'action', label: 'Action' },
        { key: 'doc', label: 'Doc' },
        { key: 'year', label: 'Year', sortable: true },
        { key: 'ncrNumber', label: 'NCR Number', sortable: true },
        { key: 'departemen', label: 'Departemen', sortable: true },
        { key: 'source', label: 'Source', sortable: true },
        { key: 'type', label: 'Type', sortable: true },
        { key: 'dueDate', label: 'Due Date', sortable: true },
        { key: 'status', label: 'Status', sortable: true }
      ],
      totalRows: 10,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 20, 50, 100, 500, 1000],
      sortBy: '',
      sortDesc: false,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  mounted() {
    this.getAllFilter()
  },
  methods: {
    async getAllFilter() {
      const user = JSON.parse(localStorage.getItem('profile'))
      const { data } = await api.myDocument.list({
        userId: user.id,
        currentPage: 1,
        lengthData: 9999
      })
      this.options = {
        year: [...new Set(data.myDocumentList.map(a => a.year).filter(x => x))],
        source: [...new Set(data.myDocumentList.map(a => a.sourceType).filter(x => x))],
        status: [...new Set(data.myDocumentList.map(a => a.status).filter(x => x))],
        type: [...new Set(data.myDocumentList.map(a => a.ncrType).filter(x => x))]
      }
    },
    async fetchDocuments() {
      const user = JSON.parse(localStorage.getItem('profile'))
      const sortNumber = this.getSortNumber(this.sortBy, this.sortDesc)
      const { data } = await api.myDocument.list({
        userId: user.id,
        currentPage: this.currentPage,
        lengthData: this.perPage,
        year: this.filter.year.length === 0 ? null : this.filter.year,
        sourceName: this.filter.source.length === 0 ? null : this.filter.source,
        typeNCR: this.filter.type.length === 0 ? null : this.filter.type,
        status: this.filter.status.length === 0 ? null : this.filter.status,
        ...sortNumber
      })

      this.items = data.myDocumentList.map(a => {
        return {
          year: a.year,
          ncrNumber: a.runningNumber,
          departemen: a.departemenName,
          source: a.sourceType,
          type: a.ncrType,
          dueDate: a.dueDate,
          status: a.status
        }
      })

      this.totalRows = data.lengthData

      return this.items
    },
    getSortNumber(label, descending) {
      if (label !== '') {
        const sortNumber = [
          { label: 'year', descending: false, value: 1 },
          { label: 'year', descending: true, value: 2 },
          { label: 'ncrNumber', descending: false, value: 3 },
          { label: 'ncrNumber', descending: true, value: 4 },
          { label: 'departemen', descending: false, value: 5 },
          { label: 'departemen', descending: true, value: 6 },
          { label: 'source', descending: false, value: 7 },
          { label: 'source', descending: true, value: 8 },
          { label: 'type', descending: false, value: 9 },
          { label: 'type', descending: true, value: 10 },
          { label: 'dueDate', descending: false, value: 11 },
          { label: 'dueDate', descending: true, value: 12 },
          { label: 'status', descending: false, value: 13 },
          { label: 'status', descending: true, value: 14 }
        ]

        let value
        sortNumber.map(a => {
          if (a.label === label && a.descending === descending) {
            value = { sortNumber: a.value }
          }
        })

        return value
      } else {
        return null
      }
    },
    showModal(item) {
      this.itemModal = item
    },
    resetModal() {
      this.itemModal = {}
    },
    handleOk() {}
  }
}
</script>
