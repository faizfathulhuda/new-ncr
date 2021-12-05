<template>
  <div>
    <b-row class="mb-4">
      <b-col lg="12" class="my-1">
        <b-card no-body class="mb-1">
          <b-card-header class="bg-white border-0">
            <b-link block v-b-toggle.accordion-1 variant="info" class="font-weight-bold text-decoration-none text-dark">Filter</b-link>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              <b-row>
                <b-col lg="4">
                  <b-form-group
                    label="COMPANY"
                    label-for="company-1"
                  >
                    <v-select id="company-1" multiple v-model="filterCompany" @input="$refs.table.refresh()" :options="companyOptions"></v-select>
                  </b-form-group>
                </b-col>
                <b-col lg="4">
                  <b-form-group
                    label="ORGANIZATION"
                    label-for="organization-1"
                  >
                    <v-select id="organization-1" multiple v-model="filterOrganization" @input="$refs.table.refresh()" :options="organizationOptions"></v-select>
                  </b-form-group>
                </b-col>
                <b-col lg="4">
                  <b-form-group
                    label="ROLE"
                    label-for="role-1"
                  >
                    <v-select id="role-1" multiple v-model="filterRole" @input="$refs.table.refresh()" :options="roleOptions"></v-select>
                  </b-form-group>
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
            @change="$refs.table.refresh()"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-table
      empty-text="No data"
      :items="fetchUsers"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      ref="table"
      responsive="xl"
      table-class="text-start"
      thead-tr-class="table-header"
      tbody-tr-class="table-row"
      v-bind="$attrs"
      v-on="$listeners"
      custom-prop="any"
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
    </b-table>

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
import VSelect from 'vue-select'
import api from '@/api'

export default {
  components: {
    VSelect
  },
  data() {
    return {
      itemModal: {},
      filterCompany: [],
      companyOptions: [],
      filterOrganization: [],
      organizationOptions: [],
      filterRole: [],
      roleOptions: [],
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
      this.companyOptions = data.map(a => {
        return { label: a.name, key: a.id }
      })
    },
    async getOrganization() {
      const { data } = await api.organization.list()
      this.organizationOptions = data.map(a => {
        return { label: a.name, key: a.id }
      })
    },
    async getRole() {
      const { data } = await api.role.list()
      this.roleOptions = data.map(a => {
        return { label: a.name, key: a.id }
      })
    },
    async fetchUsers() {
      const { data } = await api.user.list({
        currentPage: this.currentPage,
        length: this.perPage,
        companyId: this.filterCompany.map(a => a.key).length === 0 ? null : this.filterCompany.map(a => a.key),
        organizationId: this.filterOrganization.map(a => a.key).length === 0 ? null : this.filterOrganization.map(a => a.key),
        roleId: this.filterRole.map(a => a.key).length === 0 ? null : this.filterRole.map(a => a.key),
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
              organization: a.workLocation ? a.workLocation.name : ' ',
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
