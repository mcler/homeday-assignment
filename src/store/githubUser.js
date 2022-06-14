import { getUser } from '@/utils/api'
import { createSetters } from '@/utils/createSetters'

export const githubUser = {
    namespaced: true,
    state: {
        loading: true,
        error: false,
        data: null,
    },
    getters: {
        username: (_, __, rootState) => rootState.credentials?.username,
    },
    mutations: {
        ...createSetters(['loading', 'error', 'data']), // automatic creation of setters
    },
    actions: {
        loadUser({ getters, commit, dispatch }) {
            // resetting state
            commit('SET_LOADING', true)
            commit('SET_ERROR', false)
            commit('SET_DATA', null)

            const username = getters.username

            if (!username) return Promise.reject('Empty username')

            return getUser(username)
                .then(async (user) => {
                    commit('SET_DATA', user)
                    const repos = await dispatch('githubRepos/loadRepos', null, { root: true })

                    return { user, repos }
                })
                .catch(() => commit('SET_ERROR', true))
                .finally(() => commit('SET_LOADING', false))
        },
    },
}
