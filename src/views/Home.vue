<template>
  <div id="home" class="home">
    <div class="header">
      <img
        class="ml-3"
        src="@/assets/logo_inoc.png"
        width="75"
        height="30"
      >
      <a
        class="icon d-lg-none mr-auto"
        @click.prevent.stop="setSidebar(!sidebar)"
      >
        <fa-icon icon="bars" size="lg" />
      </a>
      <div class="d-flex align-items-center mr-2">
        <img class="pb-2 mr-3" src="@/assets/logo_itm.png" width="40" height="30">
        <b-dropdown
          menu-class="shadow"
          variant="outlane-primary"
          toggle-class="text-decoration-none"
          no-caret
        >
          <template #button-content>
            <div class="profile d-flex align-items-center">
              <b-avatar
                button
                variant="secondary"
                :text="profile.fullname.charAt(0)"
                class="align-baseline mr-3"
                size="3rem"
              >
              </b-avatar>
              <div>
                <span>{{ profile.fullname }}</span>
                <br>
                <span class="text-muted">
                  {{ profile.role.length === 1 ? profile.role[0].name : 'MULTIROLE'}}
                </span>
              </div>
            </div>
          </template>
          <b-dropdown-text style="max-width: 350px;">
            <div class="role d-flex align-items-center">
              <b-avatar
                button
                variant="secondary"
                :text="profile.fullname.charAt(0)"
                class="align-baseline mr-3"
                size="4rem"
              >
              </b-avatar>
              <div>
                <span>{{ profile.fullname }}</span>
                <br>
                <span class="text-muted">{{ profile.email }}</span>
              </div>
            </div>
            <div v-if="profile.role.length != 1" class="role text-muted mt-2">
              <small>
                {{ profile.role.map(i => { return i.name }).join(', ') }}
              </small>
            </div>
          </b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <home-sidebar
      :active="sidebar"
      :expanded="sidebarExpanded"
      :locked="sidebarLocked"
      @reset="setSidebar"
      @expand="expandSidebar"
      @lock="lockSidebar"
    />
    <div
      class="overlay"
      :class="{ 'shown': sidebar }"
    />
    <main :class="{ 'expanded': !sidebarExpanded }">
      <div class="title mb-5 ml-lg-2 text-uppercase">
        <h4 class="mb-0">{{ title }}</h4>
        <span class="sub-title">{{ title }}</span>
      </div>
      <div>
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import api from '@/api'
import VueScrollTo from 'vue-scrollto'
import HomeSidebar from '@/components/HomeSidebar'

export default {
  components: {
    HomeSidebar
  },

  data: () => ({
    sidebar: false,
    sidebarExpanded: false,
    sidebarLocked: false,
    profile: JSON.parse(localStorage.getItem('profile'))
  }),

  computed: {
    title() {
      return this.$route.name
    }
  },

  methods: {
    setSidebar(value) {
      this.sidebar = value
    },
    expandSidebar(value) {
      this.sidebarExpanded = value
    },
    lockSidebar() {
      this.sidebarLocked = !this.sidebarLocked
    },
    scrollToTop() {
      VueScrollTo.scrollTo('#dashboard', 500, {
        container: '#dashboard'
      })
    },
    async logout() {
      try {
        const id = this.profile.id
        await api.auth.logout({ id: id })
        localStorage.clear()
        this.$router.replace('/login')
      } catch ({ response }) {
        this.$nextTick(() => {
          this.$bvToast.toast(`${response.status} ${response.data.error.message}`, {
            headerClass: 'd-none',
            solid: true,
            variant: 'danger'
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.home {
  background: #fff;
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  overflow: hidden;
}

.overlay {
  background: #000;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: 0.3s;
  visibility: hidden;
  z-index: 102;

  &.shown {
    opacity: 0.9;
    visibility: visible;
  }
}

main {
  background-color: #fff;
  margin: 30px 0px 12px 12px;
  padding: 0px 20px 20px 20px;
  overflow: auto;
  transition: 0.3s;
  height: 100%;

  @media screen and (min-width: 992px) {
    margin-left: 260px;

    &.expanded {
      margin-left: 80px;
    }
  }
}

.profile {
  color: #000;
  font-size: 1rem;
  padding: 5px;
}

.role {
  font-size: 1.3rem;
}

.icon-user {
  font-size: 30px;
}

.icon {
  color: inherit;
  padding: 10px 15px;
}
</style>
