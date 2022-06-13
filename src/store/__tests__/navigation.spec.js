import { describe, test, expect, beforeAll } from 'vitest'

import { store } from '@/store'

describe('store/navigation', () => {
    // Mock `vuex-router-sync` module
    beforeAll(() => {
        store.registerModule('route', {
            namespaced: true,
            state: {
                name: 'home',
            },
            mutations: {
                SET_NAME: (state, name) => state.name = name,
            },
        })
    })

    test('Initially blocked email page', () => {
        expect(store.getters['navigation/canGoPageEmail']).toEqual(false)
        expect(store.getters['navigation/buttons']).toEqual({ start: true })
    })

    test('Initially blocked github page', () => {
        expect(store.getters['navigation/canGoPageGithub']).toEqual(false)
    })

    test('Blocked email page when firstname is empty', async () => {
        store.commit('route/SET_NAME', 'login')

        store.commit('credentials/SET_FIRSTNAME', '')
        store.commit('credentials/SET_LASTNAME', 'Somebody')
        store.commit('credentials/SET_USERNAME', 'mcler')
        fetch.mockResponseOnce('{"login": "mcler"}')
        await store.dispatch('credentials/checkUsername')

        expect(store.getters['navigation/canGoPageEmail']).toEqual(false)
        expect(store.getters['navigation/buttons']).toEqual({
            prev: { to: 'home' },
            next: { to: 'email', disabled: true },
        })
    })

    test('Blocked email page when lastname is empty', async () => {
        store.commit('route/SET_NAME', 'login')

        store.commit('credentials/SET_FIRSTNAME', 'Mr')
        store.commit('credentials/SET_LASTNAME', '')
        store.commit('credentials/SET_USERNAME', 'mcler')
        fetch.mockResponseOnce('{"login": "mcler"}')
        await store.dispatch('credentials/checkUsername')

        expect(store.getters['navigation/canGoPageEmail']).toEqual(false)
        expect(store.getters['navigation/buttons']).toEqual({
            prev: { to: 'home' },
            next: { to: 'email', disabled: true },
        })
    })

    test('Blocked email page when username is empty', async () => {
        store.commit('route/SET_NAME', 'login')

        store.commit('credentials/SET_FIRSTNAME', 'Mr')
        store.commit('credentials/SET_LASTNAME', 'Somebody')
        store.commit('credentials/SET_USERNAME', '')
        await store.dispatch('credentials/checkUsername')

        expect(store.getters['navigation/canGoPageEmail']).toEqual(false)

        expect(store.getters['navigation/canGoPageEmail']).toEqual(false)
        expect(store.getters['navigation/buttons']).toEqual({
            prev: { to: 'home' },
            next: { to: 'email', disabled: true },
        })
    })

    test('Unblock email on filled login page data', async () => {
        store.commit('route/SET_NAME', 'login')

        store.commit('credentials/SET_FIRSTNAME', 'Mr')
        store.commit('credentials/SET_LASTNAME', 'Somebody')
        store.commit('credentials/SET_USERNAME', 'mcler')
        store.commit('credentials/SET_USERNAME_CHECKING', false)
        store.commit('credentials/SET_USERNAME_VALID', true)

        expect(store.getters['navigation/canGoPageEmail']).toEqual(true)
        expect(store.getters['navigation/buttons']).toEqual({
            prev: { to: 'home' },
            next: { to: 'email', disabled: false },
        })
    })

    test('Block email on not filled firstname', async () => {
        store.commit('route/SET_NAME', 'login')

        store.commit('credentials/SET_FIRSTNAME', '')
        store.commit('credentials/SET_LASTNAME', 'Somebody')
        store.commit('credentials/SET_USERNAME', 'mcler')
        fetch.mockResponseOnce('{"login": "mcler"}')
        await store.dispatch('credentials/checkUsername')
        store.commit('credentials/SET_EMAIL', 'email@email.com')
        store.commit('credentials/SET_AGREE', 'email')

        expect(store.getters['navigation/canGoPageEmail']).toEqual(false)
        expect(store.getters['navigation/buttons']).toEqual({
            prev: { to: 'home' },
            next: { to: 'email', disabled: true },
        })
    })

    test('Unblock email on filled login page data', async () => {
        store.commit('route/SET_NAME', 'email')

        store.commit('credentials/SET_FIRSTNAME', 'Mr')
        store.commit('credentials/SET_LASTNAME', 'Somebody')
        store.commit('credentials/SET_USERNAME', 'mcler')
        fetch.mockResponseOnce('{"login": "mcler"}')
        await store.dispatch('credentials/checkUsername')
        store.commit('credentials/SET_EMAIL', 'email@email.com')
        store.commit('credentials/SET_AGREE', true)

        expect(store.getters['navigation/canGoPageGithub']).toEqual(true)
        expect(store.getters['navigation/buttons']).toEqual({
            prev: { to: 'login' },
            next: { to: 'github', disabled: false },
        })
    })

    test('Github page buttons', async () => {
        store.commit('route/SET_NAME', 'github')

        expect(store.getters['navigation/buttons']).toEqual({
            prev: { to: 'email' },
            next: { disabled: true, hidden: true },
        })
    })
})
