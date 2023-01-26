import esmock from 'esmock';
import { test } from 'uvu';
import * as assert from 'uvu/assert';
import sinon from "sinon";

test('should make a GET request to https://euro.lotto.game/results', async () => {
    const fetchStub = sinon.stub();
    const responseStub = {
        json: sinon.stub()
    };
    const { getLottoNumbers } = await esmock('./getLottoNumbers.js', {
        undici: { fetch: fetchStub.resolves(responseStub) }
    });
    await getLottoNumbers();
    assert.equal(fetchStub.calledOnceWith('https://euro.lotto.game/results'), true);
});

test('should parse the response as JSON and then turn it into a Set', async () => {
    const fetchStub = sinon.stub();
    const responseStub = {
        json: sinon.stub().resolves([1,2,3,4,5,6,7])
    };
    const { getLottoNumbers } = await esmock('./getLottoNumbers.js', {
        undici: { fetch: fetchStub.resolves(responseStub) }
    });
    const result = await getLottoNumbers();
    assert.equal(result, new Set([1,2,3,4,5,6,7]));
});

test.run();