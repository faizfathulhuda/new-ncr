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
        <!-- <fa-icon
          class="mr-3"
          :icon="menu.icon"
          fixed-width
        /> -->
        <b-icon
          class="mr-3"
          :icon="menu.icon"
          fixed-width
        ></b-icon>
        <span>
          {{ menu.text }}
        </span>
      </router-link>
      <!-- <div
        class="link text-nowrap"
        v-b-toggle.collapse-1
        @click.stop
      >
        <fa-icon
          class="mr-3"
          icon="shapes"
          fixed-width
        />
        <span>
          Categories
        </span>
      </div> -->
      <!-- <b-collapse
        id="collapse-1"
        class="mt-2 text-nowrap"
      >
        <b-card>
          <router-link
            class="sub-link"
            v-for="(menu, m) of menuCategory"
            :key="m"
            :to="menu.path"
            :exact="menu.exact"
            @click.stop.native="reset"
          >
            {{ menu.text }}
          </router-link>
        </b-card>
      </b-collapse> -->
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
  margin-top: 50px;
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
    width: 230px;
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
   background-color: #00B4A5;
   cursor: pointer;
   border-radius: 10px;
 }

.username {
  color: var(--md-grey-700);
  font-size: 0.75em;
  padding: 0 15px;
}

.card {
  background: var(--md-cyan-700);
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
