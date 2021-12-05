<template>
  <div>
    <b-row class="mb-4">
      <b-col lg="12" class="my-1">
        <b-card no-body class="mb-1">
          <b-card-header class="bg-white border-0">
            <b-link
              block
              v-b-toggle.user-management
              variant="info"
              class="font-weight-bold text-decoration-none text-dark"
            >
              Filter
            </b-link>
          </b-card-header>
          <b-collapse id="user-management" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col lg="4">
                  <custom-select
                    label="Company"
                    placeholder="Filter by Company"
                    v-model="filter.company"
                    @input="$refs.table.$refs.table.refresh()"
                    :options="options.company"
                  />
                </b-col>
                <b-col lg="4">
                  <custom-select
                    label="Organization"
                    placeholder="Filter by Organization"
                    v-model="filter.organization"
                    @input="$refs.table.$refs.table.refresh()"
                    :options="options.organization"
                  />
                </b-col>
                <b-col lg="4">
                  <custom-select
                    label="Role"
                    placeholder="Filter by Role"
                    v-model="filter.role"
                    @input="$refs.table.$refs.table.refresh()"
                    :options="options.role"
                  />
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col lg="3" class="my-1">
        <b-button variant="outline-primary">ADD USER</b-button>
      </b-col>
      <b-col lg="6" class="my-1">
        <b-row class="align-items-center justify-content-center">
          <p>Show</p>
          <b-form-group
            class="mb-0 mx-3"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
          <p>Entries</p>
        </b-row>
      </b-col>
      <b-col lg="3" class="my-1">
        <b-form-group class="m-0">
          <b-form-input
            v-model="keyword"
            placeholder="Search..."
            @input="$refs.table.$refs.table.refresh()"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <custom-table
      :items="fetchUsers"
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

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your Name"
      @hidden="resetModal"
      @ok="handleOk"
      centered
    >
      <b-form-group
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
      >
        <b-form-input
          id="name-input"
          v-model="itemModal.name"
          required
        ></b-form-input>
      </b-form-group>
    </b-modal>
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
        company: [],
        organization: [],
        role: []
      },
      filter: {
        company: [],
        organization: [],
        role: []
      },
      keyword: '',
      items: [],
      fields: [
        { key: 'fullname', label: 'Fullname', sortable: true },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'company', label: 'Company' },
        { key: 'organization', label: 'Organization' },
        { key: 'role', label: 'Role' },
        { key: 'action', label: 'Action' }
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
    this.getCompany()
    this.getOrganization()
    this.getRole()
  },
  methods: {
    async getCompany() {
      const { data } = await api.company.list()
      this.options.company = data.map(a => {
        return { label: a.name, key: a.id }
      })
    },
    async getOrganization() {
      const { data } = await api.organization.list()
      this.options.organization = data.map(a => {
        return { label: a.name, key: a.id }
      })
    },
    async getRole() {
      const { data } = await api.role.list()
      this.options.role = data.map(a => {
        return { label: a.name, key: a.id }
      })
    },
    async fetchUsers() {
      const { data } = await api.user.list({
        currentPage: this.currentPage,
        length: this.perPage,
        companyId: this.filter.company.map(a => a.key).length === 0 ? null : this.filter.company.map(a => a.key),
        organizationId: this.filter.organization.map(a => a.key).length === 0 ? null : this.filter.organization.map(a => a.key),
        roleId: this.filter.role.map(a => a.key).length === 0 ? null : this.filter.role.map(a => a.key),
        keyword: this.keyword === '' ? null : this.keyword,
        asc: !this.sortDesc
      })

      if (data.user === null && data.userList === null) {
        this.items = []
      } else {
        if (data.foundData === 1) {
          this.items = [{
            fullname: data.user.fullname,
            username: data.user.username,
            email: data.user.email,
            company: data.user.company.name,
            organization: data.user.workLocation ? data.user.workLocation.name : ' ',
            role: data.user.userRoleList.map(a => {
              return a.name
            })
          }]
        } else {
          this.items = data.userList.map(a => {
            return {
              fullname: a.fullname,
              username: a.username,
              email: a.email,
              company: a.company.name,
              organization: a.workLocation ? a.workLocation.name : '',
              role: a.userRoleList.map(a => {
                return a.name
              })
            }
          })
        }
      }

      this.totalRows = data.foundData < this.perPage ? data.foundData : data.lengthData

      return this.items
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

<style lang="scss">
.card {
  width: 100%;
  margin: auto;
  box-shadow: 17px 20px 40px 0 rgba(233, 234, 241, 0.36);
  border: none;
  border-radius: 24px;

  .card-header {
    border: none;
    border-radius: 24px;
  }
}
</style>
