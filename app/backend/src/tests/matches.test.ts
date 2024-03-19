import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import * as matchesMock from '../tests/mocks/match.mocks'
import { App } from '../app';

// @ts-ignore
import chaiHttp = require('chai-http');
import MatchService from '../service/matches.service';
import MatchModel from '../database/models/Macthes.Model';
import TeamService from '../service/teams.service';
import MatchController from '../controller/matches.controller';
import { MatchesInterface } from '../Interfaces/macthes.interface';
import { MatchModelInterface } from '../Interfaces/matches.interface.model';
import ValidateToken from '../middlewares/validateToken';
import { tokenOk } from '../tests/mocks/user.Mocks'
import SequelizeMatches from '../database/models/Sequelize.Matches.Model';


chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('Matches', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Verifica se retorna um error, caso não envie um token', async function () {
    const { status, body } = await chai.request(app).post("/matches")
    .send(matchesMock.NewMatches)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token not found' })
  })

  it('Verifica se retorna um error, caso seja um token inválido', async function () {

    sinon.stub(jwt, 'verify').throws(new Error('Token must be a valid token'))
    const { status, body } = await chai.request(app).post("/matches")
    .set({'Authorization': `Bearer any-token`})
    .send(matchesMock.NewMatches)

    expect(status).to.be.equal(401)
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' })
  });

  afterEach(sinon.restore);
})

describe('MatchService', function () {
    let matchService: MatchService;
  
    beforeEach(function () {
      matchService = new MatchService(new MatchModel(), new TeamService());
    });
  
    afterEach(function () {
      sinon.restore();
    });
    it('Verifica se retorna todas as partidas com requisição GET para /matches', async function () {
      sinon.stub(MatchModel.prototype, 'allMatches').resolves(matchesMock.matchesOk as any);
  
      const {status, body} = await chai.request(app).get("/matches")
  
      expect(status).to.be.equal(200)
      expect(body).to.be.deep.equal(matchesMock.matchesOk)
    });
    it('Verifica se retorna todos os jogos em andamento', async function () {
        sinon.stub(MatchModel.prototype, 'allMatches').resolves(matchesMock.matchesOk);
        const result = await matchService.allMatches(true);
        expect(result.status).to.equal('SUCCESSFUL');
        expect(result.data).to.deep.equal(matchesMock.matchesOk);
    });
  
    it('Verifica se retorna todos os jogos finalizados', async function () {
      sinon.stub(MatchModel.prototype, 'allMatches').resolves(matchesMock.finishMatches);
      const result = await matchService.allMatches(false);
      expect(result.status).to.equal('SUCCESSFUL');
      expect(result.data).to.deep.equal(matchesMock.finishMatches);
    });




    it('Verifica se é possível criar uma partida com POST para /matches', async function () {
      sinon.stub(jwt, 'verify').resolves({ role: "admin"});
      const newTeam = SequelizeMatches.build(matchesMock.NewTeam);
      sinon.stub(SequelizeMatches, 'create').resolves(newTeam);
  
      const { status, body } = await chai.request(app).post("/matches")
      .set({'Authorization': `Bearer ${tokenOk}`})
      .send(matchesMock.NewMatches)
  
      expect(status).to.be.equal(201)
      expect(body).to.be.deep.equal(matchesMock.NewTeam)
    })
    
  /*
    it('Deve atualizar uma partida ao acessar /updatedMatches/:id', async function () {
      sinon.stub(MatchService.prototype, 'updatedMatches').resolves({ status: 'SUCCESSFUL', data: 'Match updated' });
      const { status, body } = await chai.request(app).put("/updatedMatches/1").send({ homeTeamGoals: 2, awayTeamGoals: 1 })
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal('Match updated');
    });
    it('Deve criar uma nova partida ao acessar /createdMatches', async function () {
      sinon.stub(MatchService.prototype, 'createdMatch').resolves({ status: 'CREATED' , data: matchesMock.NewTeam});
      const { status, body } = await chai.request(app).post("/createdMatches").send(matchesMock.NewMatches);
      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(matchesMock.NewTeam);
    }); */
  });
