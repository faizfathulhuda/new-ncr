import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBars,
  faChartPie,
  faPencilAlt,
  faFileAlt,
  faSearch,
  faTimes,
  faTrashAlt,
  faShoppingCart,
  faFolder,
  faEye,
  faUserCircle,
  faSignOutAlt,
  faHome,
  faTruck,
  faShapes,
  faUserFriends
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faBars,
  faChartPie,
  faPencilAlt,
  faFileAlt,
  faSearch,
  faTimes,
  faTrashAlt,
  faShoppingCart,
  faFolder,
  faEye,
  faUserCircle,
  faSignOutAlt,
  faHome,
  faTruck,
  faShapes,
  faUserFriends
)

Vue.component('fa-icon', FontAwesomeIcon)
