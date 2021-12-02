<template>
  <div id="home" class="home">
    <div class="header">
      <h3 class="p-2 ml-2">AgriT</h3>
      <a
        class="icon d-lg-none mr-auto"
        @click.prevent.stop="setSidebar(!sidebar)"
      >
        <fa-icon icon="bars" size="lg" />
      </a>
      <div class="profile d-flex align-items-center">
        <fa-icon class="icon-user mr-2" icon="user-circle" />
        <span>Hi, Admin</span>
      </div>
    </div>
    <!-- <home-sidebar
      :active="sidebar"
      :expanded="sidebarExpanded"
      :locked="sidebarLocked"
      @reset="setSidebar"
      @expand="expandSidebar"
      @lock="lockSidebar"
    /> -->
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
import VueScrollTo from 'vue-scrollto'
// import HomeSidebar from '@/components/HomeSidebar'

export default {
  components: {
    // HomeSidebar
  },

  data: () => ({
    sidebar: false,
    sidebarExpanded: false,
    sidebarLocked: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  color: #fff;
  display: flex;
  justify-content: space-between;
  background: var(--md-cyan-800);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.home {
  background: var(--bg-light-blue);
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
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  margin: 30px 0px 12px 12px;
  padding: 0px 20px 20px 20px;
  overflow: auto;
  transition: 0.3s;

  @media screen and (min-width: 992px) {
    margin-left: 230px;

    &.expanded {
      margin-left: 80px;
    }
  }
}

.profile {
  padding: 10px;
  background: var(--md-yellow-800);
}

.icon-user {
  font-size: 30px;
}

.icon {
  color: inherit;
  padding: 10px 15px;
}

.sub-title {
  color: #1D938C;
}
</style>
