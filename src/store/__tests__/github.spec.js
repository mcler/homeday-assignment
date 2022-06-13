import { describe, test, expect, beforeEach } from 'vitest'

import { store } from '@/store'

import mockUser from './github.user.ai.json'
import mockRepos from './github.repos.ai.json'
const mockError = { message: 'Error' }
const mockUserString = JSON.stringify(mockUser)
const mockReposString = JSON.stringify(mockRepos)
const mockErrorString = JSON.stringify(mockError)

describe('store/githubUser and store/githubRepos', () => {
    beforeEach(() => {
        fetch.resetMocks()
        store.commit('githubUser/SET_LOADING', true)
        store.commit('githubUser/SET_ERROR', false)
        store.commit('githubUser/SET_DATA', null)
        store.commit('githubRepos/SET_LOADING', true)
        store.commit('githubRepos/SET_ERROR', false)
        store.commit('githubRepos/SET_DATA', null)
    })

    test('Initial state', async () => {
        expect(store.state.githubUser.error).toEqual(false)
        expect(store.state.githubUser.loading).toEqual(true)
        expect(store.state.githubUser.data).toEqual(null)
        expect(store.state.githubRepos.error).toEqual(false)
        expect(store.state.githubRepos.loading).toEqual(true)
        expect(store.state.githubRepos.data).toEqual(null)
    })

    test('Loading flag as user load began', async () => {
        store.commit('credentials/SET_USERNAME', 'mcler')

        fetch.mockResponseOnce(mockUserString)
        store.dispatch('githubUser/loadUser')

        expect(store.state.githubUser.error).toEqual(false)
        expect(store.state.githubUser.loading).toEqual(true)
    })

    test('Error flag as user load failed', async () => {
        store.commit('credentials/SET_USERNAME', 'mcler')

        fetch.mockResponses(mockErrorString, mockReposString)
        await store.dispatch('githubUser/loadUser')

        expect(store.state.githubUser.error).toEqual(true)
        expect(store.state.githubUser.loading).toEqual(false)
        expect(store.state.githubUser.data).toEqual(null)
    })

    test('Set flags and data after successful load', async () => {
        store.commit('credentials/SET_USERNAME', 'mcler')

        fetch.mockResponses(mockUserString, mockReposString, mockReposString)

        await store.dispatch('githubUser/loadUser')

        expect(store.state.githubUser.error).toEqual(false)
        expect(store.state.githubUser.loading).toEqual(false)
        expect(store.state.githubUser.data).toEqual(mockUser)

        expect(store.state.githubRepos.error).toEqual(false)
        expect(store.state.githubRepos.loading).toEqual(false)
        expect(store.state.githubRepos.data).toEqual(mockRepos)
        expect(store.state.githubRepos.page).toEqual(1)
        expect(store.getters['githubRepos/canLoadMore']).toEqual(true)

        await store.dispatch('githubRepos/loadMoreRepos')

        expect(store.state.githubRepos.data).toEqual([...mockRepos, ...mockRepos])
        expect(store.state.githubRepos.page).toEqual(2)
    })

    test('When repos fail to load', async () => {
        store.commit('credentials/SET_USERNAME', 'mcler')

        fetch.mockResponses(mockUserString, mockErrorString)

        await store.dispatch('githubUser/loadUser')

        expect(store.state.githubUser.error).toEqual(false)
        expect(store.state.githubUser.loading).toEqual(false)
        expect(store.state.githubUser.data).toEqual(mockUser)

        expect(store.state.githubRepos.error).toEqual(true)
        expect(store.state.githubRepos.loading).toEqual(false)
        expect(store.state.githubRepos.data).toEqual(null)
    })

    test('When too few repos', async () => {
        store.commit('credentials/SET_USERNAME', 'mcler')

        const numberOfRepos = 10
        const newMockUser = { ...mockUser }
        newMockUser.public_repos = numberOfRepos
        const newMockUserString = JSON.stringify(newMockUser)
        const newMockRepos = [...mockRepos.slice(0, numberOfRepos)]
        const newMockReposString = JSON.stringify(newMockRepos)

        fetch.mockResponses(newMockUserString, newMockReposString)
        await store.dispatch('githubUser/loadUser')

        expect(store.state.githubUser.error).toEqual(false)
        expect(store.state.githubUser.loading).toEqual(false)
        expect(store.state.githubUser.data).toEqual(newMockUser)

        expect(store.state.githubRepos.error).toEqual(false)
        expect(store.state.githubRepos.loading).toEqual(false)
        expect(store.state.githubRepos.data).toEqual(newMockRepos)
        expect(store.getters['githubRepos/canLoadMore']).toEqual(false)
        await expect(store.dispatch('githubRepos/loadMoreRepos')).rejects.toBeDefined()
    })
})
