const request = require('supertest');

const app = require('../../src/app');
const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await User.create({ 
      name: 'Otavio', 
      email: 'otavio@teste.com.br', 
      password: '12312312'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '12312312'
      })

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await User.create({ 
      name: 'Otavio', 
      email: 'otavio@teste.com.br', 
      password: '12312312'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '12345678'
      })

    expect(response.status).toBe(401);
  });

  it('should return a JWT when authenticate', async () => {
    const user = await User.create({ 
      name: 'Otavio', 
      email: 'otavio@teste.com.br', 
      password: '12312312'
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '12312312'
      })

    expect(response.body).toHaveProperty("token");
  })
});