import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import ValidateToken from '../middlewares/validateToken';

import mapStatusHTTP from '../utils/mapStatusHttp';

chai.use(chaiHttp);

const { expect } = chai;

describe('mapStatusHTTP', () => {
  it('Verifica chamadas HTTPMap', () => {
    const success = mapStatusHTTP('SUCCESSFUL');
    const invalid = mapStatusHTTP('INVALID_DATA');
    const notFound = mapStatusHTTP('NOT_FOUND');
    const conflict = mapStatusHTTP('CONFLICT');
    const unauthorized = mapStatusHTTP('UNAUTHORIZED');
    const created = mapStatusHTTP('CREATED');
    
    expect(success).to.equal(200);
    expect(invalid).to.equal(400);
    expect(notFound).to.equal(404);
    expect(conflict).to.equal(409);
    expect(unauthorized).to.equal(401);
    expect(created).to.equal(201);
  });
});
