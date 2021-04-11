const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '12312312'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '12312312'
      })

    expect(response.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '12312312'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '12345678'
      })

    expect(response.status).toBe(401);
  });

  it('should return a JWT when authenticate', async () => {
    const user = await factory.create('User', {
      password: '12312312'
    })

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '12312312'
      })

    expect(response.body).toHaveProperty("token");
  });

  it('should be able to acess private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '12312312'
    })

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able to acess private routes without JWT', async () => {
    const response = await request(app).get('/dashboard');

    expect(response.status).toBe(401);
  });

  it('should not be able to acess private routes with invalid JWT', async () => {
    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});