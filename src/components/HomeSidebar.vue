<template>
  <aside
    :class="{
      'active': active,
      'expanded': expanded
    }"
    v-click-outside="reset"
    @click="$emit('lock')"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="menus">
      <router-link
        class="link text-nowrap"
        v-for="(menu, m) of menusFiltered"
        :key="m"
        :to="menu.path"
        :exact="menu.exact"
        @click.stop.native="reset"
      >
        <img class="mr-3" src="@/assets/ic_dashboard.svg">
        <span>
          {{ menu.text }}
        </span>
      </router-link>
      <div
        class="link text-nowrap"
        v-b-toggle.collapse-1
        @click.stop
      >
        <img class="mr-3" src="@/assets/post_add.svg">
        <span>
          Create
        </span>
      </div>
      <b-collapse
        id="collapse-1"
        class="mt-2 text-nowrap"
      >
        <b-card>
          <router-link
            class="sub-link"
            v-for="(menu, m) of menuCreate"
            :key="m"
            :to="menu.path"
            :exact="menu.exact"
            @click.stop.native="reset"
          >
            {{ menu.text }}
          </router-link>
        </b-card>
      </b-collapse>
      <div
        class="link text-nowrap"
        v-b-toggle.collapse-2
        @click.stop
      >
        <img class="mr-3" src="@/assets/file_copy.svg">
        <span>
          Document
        </span>
      </div>
      <b-collapse
        id="collapse-2"
        class="mt-2 text-nowrap"
      >
        <b-card>
          <router-link
            class="sub-link"
            v-for="(menu, m) of menuDocument"
            :key="m"
            :to="menu.path"
            :exact="menu.exact"
            @click.stop.native="reset"
          >
            {{ menu.text }}
          </router-link>
        </b-card>
      </b-collapse>
      <div
        class="link text-nowrap"
        v-b-toggle.collapse-3
        @click.stop
      >
        <img class="mr-3" src="@/assets/folder_shared.svg">
        <span>
          Report
        </span>
      </div>
      <b-collapse
        id="collapse-3"
        class="mt-2 text-nowrap"
      >
        <b-card>
          <router-link
            class="sub-link"
            v-for="(menu, m) of menuReport"
            :key="m"
            :to="menu.path"
            :exact="menu.exact"
            @click.stop.native="reset"
          >
            {{ menu.text }}
          </router-link>
        </b-card>
      </b-collapse>
      <div
        class="link text-nowrap"
        v-b-toggle.collapse-4
        @click.stop
      >
        <img class="mr-3" src="@/assets/settings.svg">
        <span>
          Settings
        </span>
      </div>
      <b-collapse
        id="collapse-4"
        class="mt-2 text-nowrap"
      >
        <b-card>
          <router-link
            class="sub-link"
            v-for="(menu, m) of menuSetting"
            :key="m"
            :to="menu.path"
            :exact="menu.exact"
            @click.stop.native="reset"
          >
            {{ menu.text }}
          </router-link>
        </b-card>
      </b-collapse>
    </div>
  </aside>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  directives: {
    clickOutside: vClickOutside.directive
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    menus: [
      {
        path: '/dashboard',
        text: 'Dashboard',
        icon: 'columns-gap'
      }
    ],
    menuCreate: [
      {
        path: '/internal-audit',
        text: 'Internal Audit',
        icon: ''
      },
      {
        path: '/external-audit',
        text: 'External Audit',
        icon: ''
      },
      {
        path: '/qar-hse',
        text: 'QAR-HSE',
        icon: ''
      },
      {
        path: '/investigation-report',
        text: 'Investigation Report',
        icon: ''
      },
      {
        path: '/government-inspection',
        text: 'Government Inspection',
        icon: ''
      }
    ],
    menuDocument: [
      {
        path: '/my-document',
        text: 'My Document',
        icon: ''
      },
      {
        path: '/need-my-approval',
        text: 'Need My Approval',
        icon: ''
      },
      {
        path: '/all-document',
        text: 'All Document',
        icon: ''
      }
    ],
    menuReport: [
      {
        path: '/summary',
        text: 'Summary',
        icon: ''
      },
      {
        path: '/list',
        text: 'List',
        icon: ''
      }
    ],
    menuSetting: [
      {
        path: '/user-management',
        text: 'User Management',
        icon: ''
      },
      {
        path: '/organization-management',
        text: 'Organization Management',
        icon: ''
      }
    ]
  }),

  computed: {
    menusFiltered() {
      return this.menus
        .filter(menu => menu)
    }
  },

  methods: {
    reset() {
      if (this.active) {
        this.$emit('reset', false)
      }
    },
    onMouseEnter() {
      this.$emit('expand', true)
    },
    onMouseLeave() {
      if (!this.locked) this.$emit('expand', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~material-colors/dist/colors.scss';

aside {
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3) inset;
  margin-top: 65px;
  background: var(--primary);
  bottom: 0;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  padding: 20px 15px 10px;
  top: 0;
  transform: translateX(-100%);
  transition: 0.3s;
  width: 80px;
  z-index: 103;

  &.active {
    transform: translateX(0);
  }

  &.expanded {
    width: 260px;
  }

  @media screen and (min-width: 992px) {
    transform: translateX(0);
  }
}

.logo {
  align-items: center;
  display: block;
  padding: 15px;
  margin-left: auto;
  margin-right: auto;

  img {
    clip-path: inset(0 60px 0 0);
  }

  .expanded & img {
    clip-path: none;
  }
}

.menus {
  color: #fff;
  margin-bottom: 20px;
  margin-top: 20px;
  overflow: hidden;

  .expanded & {
    overflow-y: auto;
  }
}

.bottom {
  flex-shrink: 0;
  margin-top: auto;
}

.link {
  color: #fff;
  display: block;
  font-size: 14px;
  margin-bottom: 10px;
  padding: 10px 15px;
  position: relative;
  text-decoration: none;

  span {
    display: none;

    .expanded & {
      display: inline-block;
    }
  }
}

.sub-link {
  color: inherit;
  display: block;
  font-size: 12px;
  margin-bottom: 10px;
  padding: 10px 15px;
  position: relative;
  text-decoration: none;
}

.router-link-exact-active {
   background-color: #A2A6F6;
   cursor: pointer;
   border-radius: 10px;
 }

.username {
  color: var(--md-grey-700);
  font-size: 0.75em;
  padding: 0 15px;
}

.card {
  background: var(--primary);
  border-radius: 15px;
}

.card-body {
  padding: 10px 10px 0 10px;
}

/deep/ .collapse.show {
  height: 0;
  opacity: 0;
  transition: 0.3s;
  visibility: hidden;

  .expanded & {
    height: auto;
    opacity: 1;
    visibility: visible;
  }
}
</style>
