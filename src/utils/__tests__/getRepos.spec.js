import { describe, test, expect } from 'vitest'

import { getRepos } from '@/utils/api'

describe('getRepos', () => {
    test('Empty login throws rejection', async () => {
        await expect(getRepos()).rejects.toBeDefined()
    })

    test('Wrong login type throws rejection', async () => {
        await expect(getRepos(Number.MIN_VALUE)).rejects.toBeDefined()
    })

    test('Wrong page throws rejection', async () => {
        await expect(getRepos('test', /\d/g)).rejects.toEqual('Page is not an integer')
        await expect(getRepos('test', 1.01)).rejects.toEqual('Page is not an integer')
        await expect(getRepos('test', 0)).rejects.toEqual('Page is less than 1')
        await expect(getRepos('test', -1)).rejects.toEqual('Page is less than 1')
    })

    test('Wrong type throws rejection', async () => {
        await expect(getRepos('test', 10, 'publicpublic')).rejects.toEqual('Type is not allowed')
    })

    test('Will work fine with just normal login', async () => {
        fetch.mockResponseOnce('{}')
        await expect(getRepos('angular')).resolves.toEqual({})
    })

    test('Will work fine with just normal login and limit', async () => {
        fetch.mockResponseOnce('{}')
        await expect(getRepos('angular', 1)).resolves.toEqual({})

        fetch.mockResponseOnce('{}')
        await expect(getRepos('angular', 2)).resolves.toEqual({})
    })

    test('Will work fine with just normal', async () => {
        fetch.mockResponseOnce('{}')
        await expect(getRepos('angular', 1, 'forks')).resolves.toEqual({})
    })
})
