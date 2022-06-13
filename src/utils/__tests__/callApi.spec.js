import { describe, test, expect } from 'vitest'

import { callApi } from '@/utils/api'

describe('callApi', () => {
    test('Resolve any received stuff (when no message)', async () => {
        fetch.mockResponseOnce('{}')
        await expect(callApi('http://test.com/')).resolves.toEqual({})
    })

    test('Error from server leads to reject', async () => {
        fetch.mockResponseOnce('{"message": "Not Found", "documentation_url": "https://docs.github.com/rest/reference/users#get-a-user"}')
        await expect(callApi('http://test.com/')).rejects.toBe('Not Found')
    })
})
