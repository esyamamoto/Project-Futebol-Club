import TeamModel from '../database/models/Teams.Model';
import mockTeams from './mocks/teams.Mocks';
import oneTeam from './mocks/teams.Mocks';
import { app } from '../app';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeams from '../database/models/Sequelize.Teams.model';


chai.use(chaiHttp);

const { expect } = chai;


describe('TeamService', () => {
  afterEach(() => {
    sinon.restore(); // Restaura o stub após cada teste
});

  it('Verifica se retorna todas as equipes', async () => { 
    sinon.stub(TeamModel.prototype, 'findAll').resolves(mockTeams as any);

    const {status, body} = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(mockTeams);
    });

  it('Verifica se retorna uma equipe pelo ID', async () => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(oneTeam as any);

  const {status, body} = await chai.request(app).get('/teams/1');

  expect(status).to.equal(200);
  expect(body).to.be.deep.eq(oneTeam);

    });
    it('Verifica se retorna NOT_FOUND se a equipe não for encontrada', async function() {
      sinon.stub(SequelizeTeams, 'findByPk').resolves(null);

      const {status, body} = await chai.request(app).get('/teams/54237452');
  
      expect(status).to.equal(404);
      expect(body).to.be.deep.eq( { message: 'Team not found'} );

      });
    });
