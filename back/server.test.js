const request = require('supertest');
const express = require('express');

// Import the app (we'll need to modify server.js to export it)
const app = require('./server');

describe('BotWar Bot API', () => {
  test('GET /action should return valid action', async () => {
    const response = await request(app)
      .get('/action')
      .expect(200);
    
    expect(response.body).toHaveProperty('move');
    expect(response.body).toHaveProperty('action');
    expect(['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY']).toContain(response.body.move);
    expect(['COLLECT', 'NONE', 'ATTACK']).toContain(response.body.action);
  });

  test('POST /action should return valid action', async () => {
    const response = await request(app)
      .post('/action')
      .send({})
      .expect(200);
    
    expect(response.body).toHaveProperty('move');
    expect(response.body).toHaveProperty('action');
    expect(['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY']).toContain(response.body.move);
    expect(['COLLECT', 'NONE', 'ATTACK']).toContain(response.body.action);
  });

  test('GET /health should return OK status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);
    
    expect(response.body).toEqual({
      status: 'OK',
      message: 'Bot is running'
    });
  });
}); 