import Vue from 'vue'
import App from './components/App'
import router from './router'
import store from './store'

Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */

store.dispatch('registerWeb3Instance')

const runVue = (isWeb3Active) => {
  new Vue({
    el: '#app',
    data: {
      isWeb3Active: isWeb3Active
    },
    router,
    store,
    template: "<App :isWeb3Active='isWeb3Active' />",
    components: { App }
  })
}

export { runVue }
