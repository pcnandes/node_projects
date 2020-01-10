const request = require('supertest')
const app = require('../../src/app')

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Autenticacao', () => {
  beforeEach(async () => {
    await truncate();
  })

  it('deve autenticar com credenciais validas', async () => {
    const user = await User.create({
      name: 'Paulo',
      email: 'aaa@ee.com',
      password: '1234'
    });

    const response = await request(app)
    .post('/sessions')
    .send({
      email: user.email,
      password: user.password
    });

    expect(response.status).toBe(200);
  });

  it('nao deve autenticar com credenciais invalidas', async () => {
    const user = await User.create({
      name: 'Paulo',
      email: 'aaa@ee.com',
      password: '1234'
    });

    const response = await request(app)
    .post('/sessions')
    .send({
      email: user.email,
      password: '999999'
    });

    expect(response.status).toBe(401);
  });
});