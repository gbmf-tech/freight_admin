import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import router from './router'
import VueMask from 'v-mask'
// import i18n from './plugins/i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './plugins/index'
import App from './components/App'
import vuetify from './plugins/vuetify'
import './components'

import './sass/main.scss'

window.Vue = require('vue')

Vue.use(VueAxios, axios)
Vue.use(VueMask)

Vue.config.productionTip = false


export const app = new Vue({
    // i18n,
    router,
    store,
    vuetify,
    ...App
})
