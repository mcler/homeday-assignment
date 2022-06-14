import { getRepos } from '@/utils/api'
import { REPOS_PER_PAGE } from '@/utils/consts'
import { createSetters } from '@/utils/createSetters'

export const githubRepos = {
    namespaced: true,
    state: {
        loading: true,
        error: false,
        page: 1,
        data: null,
    },
    getters: {
        user: (_, __, rootState) => rootState.githubUser?.data,
        canLoadMore: (state, __, rootState) => state.data && (state.page * REPOS_PER_PAGE < rootState.githubUser.data?.public_repos),
    },
    mutations: {
        ...createSetters(['loading', 'error', 'page', 'data']), // automatic creation of setters
    },
    actions: {
        loadRepos({ getters: { user }, commit }) {
            if (!user?.login) return Promise.reject('No user provided')

            // resetting state
            commit('SET_LOADING', true)
            commit('SET_ERROR', false)
            commit('SET_PAGE', 1)
            commit('SET_DATA', null)

            return getRepos(user.login, 1)
                .then(repos => {
                    commit('SET_DATA', repos)
                    return repos
                })
                .catch(() => commit('SET_ERROR', true))
                .finally(() => commit('SET_LOADING', false))
        },
        loadMoreRepos({ state: { data, page }, getters: { canLoadMore, user }, commit }) {
            if (!user?.login) return Promise.reject('No user provided')
            if (!canLoadMore) return Promise.reject('Cannot load more')

            const newPage = page + 1
            commit('SET_LOADING', true)

            return getRepos(user.login, newPage)
                .then(repos => {
                    const newArray = [ ...data, ...repos ]
                    commit('SET_DATA', newArray)
                    commit('SET_PAGE', newPage)
                    return newArray
                })
                .catch(() => commit('SET_ERROR', true))
                .finally(() => commit('SET_LOADING', false))
        },
    },
}
