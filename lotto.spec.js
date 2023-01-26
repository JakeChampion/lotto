import esmock from 'esmock'
import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('should throw an error when called as a normal function', async () => {
    const {Ticket} = await esmock('./lotto.js')
    assert.throws(() => {
        Ticket([1,2,3,4,5,6,7])
    })
})

test('called as a constructor with an array of 7 unique numbers should return an instance of Ticket', async () => {
    const {Ticket} = await esmock('./lotto.js')
    const ticket = new Ticket([1,2,3,4,5,6,7])
    assert.instance(ticket, Ticket)
})

test('called as a constructor with an array of 6 unique numbers should throw an error', async () => {
    const {Ticket} = await esmock('./lotto.js')
    assert.throws(() => {
        new Ticket([1,2,3,4,5,6])
    })
})

test('called as a constructor with an array of 8 unique numbers should throw an error', async () => {
    const {Ticket} = await esmock('./lotto.js')
    assert.throws(() => {
        new Ticket([1,2,3,4,5,6,7,8])
    })
})

test('called as a constructor with an array of 7 numbers, where some are duplicated should throw an error', async () => {
    const {Ticket} = await esmock('./lotto.js')
    assert.throws(() => {
        new Ticket([1,2,3,4,5,6,6])
    })
})

test('returns true if ticket number matches the response from https://have.i.won/the/lotto', async () => {
    const {Ticket} = await esmock('./lotto.js', 
    {
        './getLottoNumbers.js': {
            getLottoNumbers: async function getLottoNumbers (){
                return new Set([1,2,3,4,5,6,7])
            }
        }
    }
    )
    const ticket = new Ticket([1,2,3,4,5,6,7])
    assert.equal(await ticket.checkResults(), true)
})

test('returns the given ticket number', async () => {
    const {Ticket} = await esmock('./lotto.js')
    const ticket = new Ticket([2,1,5,4,3,6,7])
    assert.equal(ticket.getNumbers(), new Set([1,2,3,4,5,6,7]))
})

test.run();