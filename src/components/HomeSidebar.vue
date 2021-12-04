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
      <div class="p-1 mb-2">
        <router-link
          class="link text-nowrap"
          v-for="(menu, m) of menusFiltered"
          :key="m"
          :to="menu.path"
          :exact="menu.exact"
          @click.stop.native="reset"
          @click="selected = null"
        >
          <img class="mr-4" src="@/assets/ic_dashboard.svg">
          <span>
            {{ menu.text }}
          </span>
        </router-link>
      </div>
      <div class="mb-2">
        <div class="p-1" role="tab">
          <b-button
            id="btnCreate"
            ref="btnCreate1"
            block
            v-b-toggle.collapes-1
            variant="primary"
            class="text-nowrap text-left"
            @focus="$event.target.blur()"
          >
            <img class="mr-3" src="@/assets/post_add.svg">
            Create
          </b-button>
        </div>
        <b-collapse
          id="collapes-1"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card class="mt-2">
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
      </div>
      <div class="mb-2">
        <div class="p-1" role="tab">
          <b-button
            block
            v-b-toggle.collapes-2
            variant="primary"
            class="text-nowrap text-left"
          >
            <img class="mr-3" src="@/assets/file_copy.svg">
            Document
          </b-button>
        </div>
        <b-collapse
          id="collapes-2"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card class="mt-2">
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
      </div>
      <div class="mb-2">
        <div class="p-1" role="tab">
          <b-button
            block
            v-b-toggle.collapes-3
            variant="primary"
            class="text-nowrap text-left"
          >
            <img class="mr-3" src="@/assets/folder_shared.svg">
            Report
          </b-button>
        </div>
        <b-collapse
          id="collapes-3"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card class="mt-2">
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
      </div>
      <div class="mb-1">
        <div class="p-1" role="tab">
          <b-button
            block
            v-b-toggle.collapes-4
            variant="primary"
            class="text-nowrap text-left"
          >
            <img class="mr-3" src="@/assets/settings.svg">
            Settings
          </b-button>
        </div>
        <b-collapse
          id="collapes-4"
          accordion="my-accordion"
          role="tabpanel"
        >
          <b-card class="mt-2">
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
    isLock: null,
    menus: [
      {
        path: '/dashboard',
        text: 'Dashboard',
        icon: 'columns-gap'
      }
    ],
    menuCreate: [
      {
        path: '/internal-audit/create',
        text: 'Internal Audit',
        icon: ''
      },
      {
        path: '/external-audit/create',
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
    },
    onClick() {
      console.log('focus')
    },
    onBlur() {
      console.log('blur')
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

.menus {
  color: #fff;
  margin-bottom: 20px;
  margin-top: 20px;
  overflow: hidden;

  .expanded & {
    overflow-y: auto;
  }
}

.link {
  color: #fff;
  display: block;
  font-size: 14px;
  padding: 11px;
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
   border-radius: .25rem;
 }

.btn-primary:hover {
  background-color: #A2A6F6;
  border-color: #A2A6F6;
}

.btn-primary:focus {
  background-color: var(--primary);
  border-color: var(--primary);
  box-shadow: none;
}

.card {
  background: var(--primary);
  border-radius: 10px;
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
