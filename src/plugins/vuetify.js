import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(Vuetify, {
    components: {
        VSnackbar,
        VBtn,
        VIcon
    },
    icons: {
        iconfont: 'mdi',
    },
})
Vue.use(VuetifyToast)

export default new Vuetify()
