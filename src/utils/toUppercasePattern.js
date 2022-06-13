/**
 * Convert prop name to uppercase pattern
 * @param {string} prop
 * @returns {string}
 */
export function toUppercasePattern(prop) {
    if (typeof prop !== 'string') throw new Error('Not a string')

    return prop
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/-/g, '_')
        .replace(/_+/g, '_')
        .toUpperCase()
}
