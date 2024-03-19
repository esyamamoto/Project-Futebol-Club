import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard', () => {
  it('Testando o endpoint GET /leaderboard', async () => {
    const httpResponse = await chai
    .request(app)
    .get('/leaderboard');
    expect(httpResponse.status).to.be.eq(404);
    expect(httpResponse.body).to.be.an('object');
  });

  it('Testando o endpoint GET /leaderboard/home', async () => {
    const httpResponse = await chai
    .request(app)
    .get('/leaderboard/home');
    expect(httpResponse.status).to.be.eq(200);
    expect(httpResponse.body).to.be.an('Array');
  });

  it('Testando o endpoint GET /leaderboard/away', async () => {
    const httpResponse = await chai
    .request(app)
    .get('/leaderboard/away');
    expect(httpResponse.status).to.be.eq(404);
    expect(httpResponse.body).to.be.an('object');
  });
});