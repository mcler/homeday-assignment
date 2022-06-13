const USERNAME_NO_NOS = [
    /[^a-zA-Z0-9-]/g, // alphanumeric characters or hyphens
    /[-]{2,}/g, // no single hyphens
    /^(-)/g, // cannot begin with a hyphen
    /(-)$/g, // cannot end with a hyphen
]

/**
 * Checks if username is valid
 * @param {string} username
 * @returns {boolean}
 */
export function isGithubUsernameValid(username) {
    if (typeof username !== 'string') throw new Error('Not a string')

    return USERNAME_NO_NOS.every(rule => {
        rule.lastIndex = 0
        return !rule.test(username)
    })
}
