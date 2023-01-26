import { getLottoNumbers } from './getLottoNumbers.js'

export class Ticket {
    #numbers = [];

    static valid(numbers) {
        if (numbers.length != 7) {
            return false;
        }
        if (new Set(numbers).size != 7) {
            return false;
        }
        if (numbers.some(number => typeof number != 'number')) {
            return false;
        }
        return true;
    }

    constructor(numbers) {
        if (!Ticket.valid(numbers)) {
            throw new Error('Not a valid ticket');
        }
        this.#numbers = new Set(numbers.sort((a,b)=>a-b));
    }

    async checkResults() {
        let lottoNumbers = await getLottoNumbers();
        for (const number of lottoNumbers) {
            if (!this.#numbers.has(number)) {
                return false;
            }
        }
        return true;
    }

    getNumbers() {
        return this.#numbers;
    }
}