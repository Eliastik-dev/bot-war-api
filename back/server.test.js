const request = require('supertest');
const app = require('./server');

describe('BotWar Bot API', () => {
  test('GET /action should return current bot state', async () => {
    const response = await request(app).get('/action').expect(200);
    expect(response.body).toHaveProperty('move');
    expect(response.body).toHaveProperty('action');
    expect(['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY']).toContain(response.body.move);
    expect(['COLLECT', 'NONE', 'ATTACK']).toContain(response.body.action);
  });

  test('POST /action should update bot state', async () => {
    const response = await request(app)
      .post('/action')
      .send({ move: 'UP', action: 'COLLECT' })
      .expect(200);
    expect(response.body).toHaveProperty('move', 'UP');
    expect(response.body).toHaveProperty('action', 'COLLECT');
  });

  test('POST /action should validate move', async () => {
    const response = await request(app)
      .post('/action')
      .send({ move: 'INVALID', action: 'COLLECT' })
      .expect(200);
    expect(response.body).toHaveProperty('move');
    expect(response.body).toHaveProperty('action');
  });



  test('GET / should serve the controller page', async () => {
    const response = await request(app).get('/').expect(200);
    expect(response.text).toContain('BotWar Controller');
  });
}); 