import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import { store } from '@/store'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView, // () => import('@/views/HomeView.vue'),
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
        },
        {
            path: '/email',
            name: 'email',
            component: () => import('@/views/EmailView.vue'),
            beforeEnter: (_, __, next) => {
                if (!store.getters['navigation/canGoPageEmail']) {
                    next({ name: 'login' })
                    return
                }
                next()
            },
        },
        {
            path: '/github',
            name: 'github',
            component: () => import('@/views/GithubView.vue'),
            beforeEnter: (_, __, next) => {
                if (!store.getters['navigation/canGoPageGithub']) {
                    next({ name: 'email' })
                    return
                }
                next()
            },
        },
    ],
})
