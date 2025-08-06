const BotLogic = require('../botLogic');

describe('BotLogic', () => {
  let bot;

  beforeEach(() => {
    bot = new BotLogic();
  });

  describe('constructor', () => {
    test('should initialize bot with default values', () => {
      expect(bot.position).toEqual({ x: 0, y: 0 });
      expect(bot.score).toBe(0);
      expect(bot.lastAction).toBe('STAY');
      expect(bot.moveActions).toContain('UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY');
      expect(bot.actionActions).toContain('COLLECT', 'NONE', 'ATTACK');
    });
  });

  describe('getNextMoveAction', () => {
    test('should return a valid move action', () => {
      const action = bot.getNextMoveAction();
      expect(bot.moveActions).toContain(action);
    });

    test('should update lastMoveAction', () => {
      const action = bot.getNextMoveAction();
      expect(bot.lastMoveAction).toBe(action);
    });
  });

  describe('getNextGameAction', () => {
    test('should return a valid game action', () => {
      const action = bot.getNextGameAction();
      expect(bot.actionActions).toContain(action);
    });

    test('should update lastGameAction', () => {
      const action = bot.getNextGameAction();
      expect(bot.lastGameAction).toBe(action);
    });
  });

  describe('getNextAction', () => {
    test('should return a valid action', () => {
      const action = bot.getNextAction();
      const allActions = [...bot.moveActions, ...bot.actionActions];
      expect(allActions).toContain(action);
    });

    test('should update lastAction', () => {
      const action = bot.getNextAction();
      expect(bot.lastAction).toBe(action);
    });
  });

  describe('processCommand', () => {
    test('should handle MOVE_UP command', () => {
      const result = bot.processCommand('MOVE_UP');
      expect(bot.position.y).toBe(-1);
      expect(result.position.y).toBe(-1);
    });

    test('should handle MOVE_DOWN command', () => {
      const result = bot.processCommand('MOVE_DOWN');
      expect(bot.position.y).toBe(1);
      expect(result.position.y).toBe(1);
    });

    test('should handle MOVE_LEFT command', () => {
      const result = bot.processCommand('MOVE_LEFT');
      expect(bot.position.x).toBe(-1);
      expect(result.position.x).toBe(-1);
    });

    test('should handle MOVE_RIGHT command', () => {
      const result = bot.processCommand('MOVE_RIGHT');
      expect(bot.position.x).toBe(1);
      expect(result.position.x).toBe(1);
    });

    test('should handle COLLECT_POINT command', () => {
      const result = bot.processCommand('COLLECT_POINT');
      expect(bot.score).toBe(1);
      expect(result.score).toBe(1);
    });

    test('should handle COLLECT_MEGA_POINT command', () => {
      const result = bot.processCommand('COLLECT_MEGA_POINT');
      expect(bot.score).toBe(20);
      expect(result.score).toBe(20);
    });

    test('should accumulate score correctly', () => {
      bot.processCommand('COLLECT_POINT');
      bot.processCommand('COLLECT_MEGA_POINT');
      bot.processCommand('COLLECT_POINT');
      expect(bot.score).toBe(22);
    });
  });

  describe('getState', () => {
    test('should return current bot state', () => {
      const state = bot.getState();
      expect(state).toEqual({
        position: { x: 0, y: 0 },
        score: 0,
        lastAction: 'STAY'
      });
    });
  });
}); 