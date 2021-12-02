<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App'
  // components: {
  //   HelloWorld
  // }
}
</script>

<style lang="scss">
@import '~material-colors/dist/colors.scss';
@import '~material-colors/dist/colors.var';

$primary: $md-amber-600;

@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';
@import "~vue-select/src/scss/vue-select.scss";

:root {
  --bg-light-blue: #{lighten($md-blue-50, 5%)};
}

html {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media screen and (min-width: 992px) {
    font-size: 14px;
  }
}

a {
  color: #fff;
  cursor: pointer;

  &.add-edit {
    color: var(--md-cyan-800);
  }

  &.delete {
    color: red;
  }
}

:placeholder-shown {
  color: var(--md-grey-600);
}

.has-bottom-menu {
  margin-bottom: 50px;
}

.line-height-1 {
  line-height: 1;
}

.width-200 {
  width: 200px;
}

.b-toaster.b-toaster-top-right {
  top: 50px;
}

.b-toast {
  box-shadow: 0 10px 15px -5px rgba(black, 0.05);
}

.mx-datepicker {
  width: 100% !important;
}

.mx-input {
  .is-invalid & {
    border-color: $danger;
  }
}

.btn {
  color: white;
}

.vue-numeric-input {
  width: 100% !important;

  .numeric-input {
    height: calc(1.5em + 0.75rem + 2px);
    outline: 0;
    padding-left: 2.4rem !important;
    padding-right: 2.4rem !important;
  }

  .btn {
    height: 1.5rem;
    top: 50% !important;
    transform: translateY(-50%);

    &-decrement {
      left: 0.5rem !important;
    }

    &-increment {
      right: 0.5rem !important;
    }
  }
}

.vs__dropdown-toggle {
  .is-invalid & {
    border-color: $danger;
  }

  .vs__actions svg {
    vertical-align: initial;
  }
}

.pointer {
  cursor: pointer;
}

.btn-cancel, .btn-close {
  color: red;
  &.btn-cancel:hover {
    color: white;
  }
}
</style>
