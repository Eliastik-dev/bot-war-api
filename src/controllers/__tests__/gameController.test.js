const request = require('supertest');
const app = require('../../index');

describe('Game Controller', () => {
  describe('GET /action', () => {
    test('should return a valid action response', async () => {
      const response = await request(app)
        .get('/action')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('action');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('message');
      
      // Check if action is valid
      const validActions = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY', 'COLLECT', 'NONE', 'ATTACK'];
      expect(validActions).toContain(response.body.action);
    });
  });

  describe('POST /command', () => {
    test('should process a valid command', async () => {
      const command = 'MOVE_UP';
      
      const response = await request(app)
        .post('/command')
        .send({ command })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('result');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain(command);
    });

    test('should handle command with game state', async () => {
      const command = 'COLLECT_POINT';
      const gameState = { position: { x: 1, y: 1 } };
      
      const response = await request(app)
        .post('/command')
        .send({ command, gameState })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('result');
    });

    test('should handle missing command', async () => {
      const response = await request(app)
        .post('/command')
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message');
    });
  });
}); 