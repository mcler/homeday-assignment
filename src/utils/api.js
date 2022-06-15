import { REPOS_PER_PAGE, REPOS_TYPES } from './consts'

/**
 * Request data from URL and returns JSON
 * @param {string} url
 * @param {Record<string, string | number>} init
 * @param {RequestInit | undefined} init
 * @returns {Promise<unknown>}
 */
export function callApi(url, params = {}, init) {
    const fetchUrl = new URL(url)

    for (let key in params) {
        const value = params[key]
        if (value !== undefined) {
            fetchUrl.searchParams.append(key, params[key])
        }
    }

    return fetch(fetchUrl, init)
        .then(res => res.json())
        .then(json => json.message ? Promise.reject(json.message) : json)
}

/**
 * Requests info about Github user
 * @param {string} login
 * @returns {Promise<unknown>}
 */
export function getUser(login) {
    if (!login) return Promise.reject('Empty login')
    if (typeof login !== 'string') return Promise.reject('Login must be a string')

    return callApi(`https://api.github.com/users/${login}`)
}

/**
 * Requests info about repositories of Github user
 * @param {string} login
 * @param {number} page
 * @param {'all' | 'public' | 'private' | 'forks' | 'sources' | 'member' | 'internal'} type
 * @returns {Promise<unknown>}
 */
export function getRepos(login, page = 1, type = 'public') {
    if (!login) return Promise.reject('Empty login')
    if (typeof login !== 'string') return Promise.reject('Login must be a string')

    if (!Number.isInteger(page)) return Promise.reject('Page is not an integer')
    if (page < 1) return Promise.reject('Page is less than 1')

    if (!type) return Promise.reject('Type is not specified')
    if (!REPOS_TYPES.includes(type)) return Promise.reject('Type is not allowed')

    return callApi(`https://api.github.com/users/${login}/repos`, { per_page: REPOS_PER_PAGE, page, type })
}
