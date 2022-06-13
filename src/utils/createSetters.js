import { toUppercasePattern } from '@/utils/toUppercasePattern'

/**
 * Creates mutations for array of store state properties
 * @example `nameChecked` -> `SET_NAME_CHECKED`
 * @param {string[]} props Names of state properties
 * @returns {Record<string, (state, value) => void>}
 */
export function createSetters(props) {
    if (!Array.isArray(props)) {
        throw new Error('Not an array')
    }
    return Object.fromEntries(
        props.map(prop => [`SET_${toUppercasePattern(prop)}`, (state, value) => state[prop] = value]),
    )
}
