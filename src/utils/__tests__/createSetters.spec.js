import { describe, test, expect } from 'vitest'

import { createSetters } from '@/utils/createSetters'

describe('createSetters', () => {
    test('non-array is invalid', () => {
        expect(() => createSetters()).toThrowError('Not an array')
        expect(() => createSetters(Number.MIN_VALUE)).toThrowError('Not an array')
    })

    test('create setter function', () => {
        expect((() => {
            const setters = createSetters(['minValue'])
            return setters['SET_MIN_VALUE']
        })()).toBeTypeOf('function')
    })

    test('working setter', () => {
        expect((() => {
            const state = { minValue: 0 }
            const setters = createSetters(['minValue'])
            setters['SET_MIN_VALUE'](state, 1)
            return state
        })()).toEqual({ minValue: 1 })
    })
})
