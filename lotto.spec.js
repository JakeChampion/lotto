import esmock from 'esmock'
import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('should throw an error when called as a normal function', async () => {
})

test('called as a constructor with an array of 7 unique numbers should return an instance of Ticket', async () => {
})

test('called as a constructor with an array of 6 unique numbers should throw an error', async () => {
})

test('called as a constructor with an array of 8 unique numbers should throw an error', async () => {
})

test('called as a constructor with an array of 7 numbers, where some are duplicated should throw an error', async () => {
})

test('returns true if ticket number matches the response from https://have.i.won/the/lotto', async () => {
})

test('returns the given ticket number', async () => {
})

test.run();