import { describe, test, expect } from 'vitest'

import { getUser } from '@/utils/api'

describe('getUser', () => {
    test('Empty login throws rejection', async () => {
        await expect(getUser()).rejects.toBeDefined()
    })

    test('Wrong login type throws rejection', async () => {
        await expect(getUser(Number.MIN_VALUE)).rejects.toBeDefined()
    })

    test('Error from server leads to reject', async () => {
        fetch.mockResponseOnce('{"message": "Not Found", "documentation_url": "https://docs.github.com/rest/reference/users#get-a-user"}')
        await expect(getUser('fake-account-for-test')).rejects.toBe('Not Found')
    })

    test('Will work fine with normal login', async () => {
        fetch.mockResponseOnce('{}')
        await expect(getUser('angular')).resolves.toEqual({})
    })
})
