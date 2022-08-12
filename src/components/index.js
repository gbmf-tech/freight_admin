import Vue from 'vue'

import Child from './Base/Child'
import AdminAppMenu from './Admin/AppMenu'
import AdminAppBar from './Admin/AppBar'
import AdminDrawer from './Admin/Drawer'
import AdminFooter from './Admin/Footer'
import AdminView from './Admin/View'

[
  // Card,
  Child,
  AdminAppMenu,
  AdminView,
  AdminFooter,
  AdminDrawer,
  AdminAppBar,
  // Checkbox,
  // HasError,
  // AlertError,
  // AlertSuccess
].forEach(Component => {
  Vue.component(Component.name, Component)
})
