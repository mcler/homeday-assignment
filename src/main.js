import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import App from '@/App.vue'
import { router } from '@/router'
import { store } from '@/store'

// Enabling `route` module for store
sync(store, router)

window.$store = store

const app = new Vue({
    render: (h) => h(App),
    router: router,
    store: store,
})

window.addEventListener('load', () => {
    app.$mount('#app')
})
