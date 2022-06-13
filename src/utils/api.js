import { REPOS_PER_PAGE } from './consts'

/**
 * Request data from URL and returns JSON
 * @param {string} url
 * @param {RequestInit | undefined} init
 * @returns {Promise<unknown>}
 */
export function callApi(url, init) {
    return fetch(url, init)
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

const TYPES = ['all', 'public', 'private', 'forks', 'sources', 'member', 'internal']

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
    if (!TYPES.includes(type)) return Promise.reject('Type is not allowed')

    return callApi(`https://api.github.com/users/${login}/repos?per_page=${REPOS_PER_PAGE}&page=${page}&type=${type}`)
}
