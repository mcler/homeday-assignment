import Vue from 'vue'
import VueRouter from 'vue-router'

import { store } from '@/store'

Vue.use(VueRouter)

export const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView.vue'),
            meta: { order: 0 },
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginView.vue'),
            meta: { order: 1 },
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
            meta: { order: 2 },
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
            meta: { order: 3 },
        },
        // Lazy 404 redirect
        {
            path: '/*',
            beforeEnter: (_, __, next) => {
                next({ name: 'home' })
            },
        },
    ],
})
