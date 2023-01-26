import { fetch } from 'undici'

export async function getLottoNumbers() {
    let results = await fetch('https://euro.lotto.game/results');
    return new Set(await results.json());
}