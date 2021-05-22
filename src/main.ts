import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/scss/soft-ui-dashboard.scss'

import Toast, { PluginOptions } from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'
const toastOptions: PluginOptions = {
  // You can set your default options here
}

import axios from 'axios'
import VueAxios from 'vue-axios'
import i18n from './i18n'
import { FontAwesomeIcon } from '@/plugins/font-awesome'
import EditButton from '@/components/admin/cell/EditButton.vue'
import DeleteButton from '@/components/admin/cell/DeleteButton.vue'
import store from './store'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost/'

const app = createApp(App)
  .use(i18n)
  .use(router)
  .use(store)
  .use(VueAxios, axios)
  .component('fa', FontAwesomeIcon)
  .use(Toast, toastOptions)
  .component('EditButton', EditButton)
  .component('DeleteButton', DeleteButton)

app.mount('#app')
