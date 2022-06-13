import { describe, test, expect } from 'vitest'

import { store } from '@/store'


describe('store/credentials', () => {
    test('Username validity is null when username is empty', async () => {
        store.commit('credentials/SET_USERNAME', '')
        await store.dispatch('credentials/checkUsername')

        expect(store.state.credentials.usernameValid).toEqual(null)
    })

    test('Invalid username without fetch', async () => {
        store.commit('credentials/SET_USERNAME', '--mcler')
        await store.dispatch('credentials/checkUsername')

        expect(store.state.credentials.usernameValid).toEqual(false)
    })

    test('Username checking flag if active right after username change', async () => {
        store.commit('credentials/SET_USERNAME', 'mcler')
        store.dispatch('credentials/checkUsername')

        expect(store.state.credentials.usernameChecking).toEqual(true)
    })

    test('Username checking flag if inactive right after finishing username check', async () => {
        fetch.mockResponseOnce('{}')
        store.commit('credentials/SET_USERNAME', 'mcler')
        await store.dispatch('credentials/checkUsername')

        expect(store.state.credentials.usernameChecking).toEqual(false)
    })

    test('Wrong network response is handled as invalid username', async () => {
        fetch.mockResponseOnce('{"message": "Not Found", "documentation_url": "https://docs.github.com/rest/reference/users#get-a-user"}')
        store.commit('credentials/SET_USERNAME', 'mcler')
        await store.dispatch('credentials/checkUsername')

        expect(store.state.credentials.usernameValid).toEqual(false)
    })

    test('Good network response is handled as valid username', async () => {
        fetch.mockResponseOnce('{"login": "mcler"}')
        store.commit('credentials/SET_USERNAME', 'mcler')
        await store.dispatch('credentials/checkUsername')

        expect(store.state.credentials.usernameValid).toEqual(true)
    })
})
