import { describe, test, expect } from 'vitest'

import { isGithubUsernameValid } from '@/utils/isGithubUsernameValid'

describe('isGithubUsernameValid', () => {
    test('non-string is invalid', () => {
        expect(() => isGithubUsernameValid(Number.MIN_VALUE)).toThrowError('Not a string')
        expect(() => isGithubUsernameValid([])).toThrowError('Not a string')
        expect(() => isGithubUsernameValid({})).toThrowError('Not a string')
        expect(() => isGithubUsernameValid(/ddd/g)).toThrowError('Not a string')
    })

    test('does not begin with hypen', () => {
        expect(isGithubUsernameValid('-')).toEqual(false)
        expect(isGithubUsernameValid('-judgment')).toEqual(false)
        expect(isGithubUsernameValid('-judg-ment')).toEqual(false)
        expect(isGithubUsernameValid('----judgment')).toEqual(false)
    })

    test('does not end with hypen', () => {
        expect(isGithubUsernameValid('admiration-')).toEqual(false)
        expect(isGithubUsernameValid('admir-ation-')).toEqual(false)
        expect(isGithubUsernameValid('admiration----')).toEqual(false)
    })

    test('only one hypen', () => {
        expect(isGithubUsernameValid('wha--tever')).toEqual(false)
    })

    test('[a-zA-Z0-9-] is valid', () => {
        expect(isGithubUsernameValid('generous')).toEqual(true)
        expect(isGithubUsernameValid('g-enerous')).toEqual(true)
        expect(isGithubUsernameValid('Soulful')).toEqual(true)
        expect(isGithubUsernameValid('Soulful12')).toEqual(true)
    })

    test('Everything outside [a-zA-Z0-9-] is invalid', () => {
        expect(isGithubUsernameValid('exquisiteдень')).toEqual(false)
        expect(isGithubUsernameValid('exquisite?1')).toEqual(false)
        expect(isGithubUsernameValid('∂exquisite')).toEqual(false)
    })
})
