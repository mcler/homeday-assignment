import { describe, test, expect } from 'vitest'

import { toUppercasePattern } from '@/utils/toUppercasePattern'

describe('toUppercasePattern', () => {
    test('non-string is invalid', () => {
        expect(() => toUppercasePattern(Number.MIN_VALUE)).toThrowError('Not a string')
    })

    test('converts camelCase', () => {
        expect(toUppercasePattern('minValue')).toEqual('MIN_VALUE')
        expect(toUppercasePattern('minValueTax')).toEqual('MIN_VALUE_TAX')
        expect(toUppercasePattern('MinValueTax')).toEqual('MIN_VALUE_TAX')
    })

    test('does not affect non-latin symbols', () => {
        expect(toUppercasePattern('minValue12')).toEqual('MIN_VALUE12')
        expect(toUppercasePattern('$minValue12')).toEqual('$MIN_VALUE12')
    })

    test('replaces multiple underscores', () => {
        expect(toUppercasePattern('min__value')).toEqual('MIN_VALUE')
        expect(toUppercasePattern('min__2Value')).toEqual('MIN_2VALUE')
    })

    test('replaces hyphens', () => {
        expect(toUppercasePattern('min-value')).toEqual('MIN_VALUE')
        expect(toUppercasePattern('min--Value')).toEqual('MIN_VALUE')
    })
})
