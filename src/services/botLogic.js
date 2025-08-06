class BotLogic {
  constructor() {
    // Bot's current position (simplified)
    this.position = { x: 0, y: 0 };
    this.score = 0;
    this.lastAction = 'STAY';
    this.lastMoveAction = 'STAY';
    this.lastGameAction = 'NONE';
    
    // Available actions
    this.moveActions = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY'];
    this.actionActions = ['COLLECT', 'NONE', 'ATTACK'];
  }

  // Get the next move action for the bot
  getNextMoveAction() {
    // Pick a random move action
    const moveAction = this.moveActions[Math.floor(Math.random() * this.moveActions.length)];
    this.lastMoveAction = moveAction;
    return moveAction;
  }

  // Get the next game action for the bot
  getNextGameAction() {
    // Pick a random game action
    const gameAction = this.actionActions[Math.floor(Math.random() * this.actionActions.length)];
    this.lastGameAction = gameAction;
    return gameAction;
  }

  // Get the next action for the bot (legacy method for backward compatibility)
  getNextAction() {
    // 70% chance to move, 30% chance to do an action
    const shouldMove = Math.random() < 0.7;
    
    if (shouldMove) {
      const moveAction = this.getNextMoveAction();
      this.lastAction = moveAction;
      return moveAction;
    } else {
      const gameAction = this.getNextGameAction();
      this.lastAction = gameAction;
      return gameAction;
    }
  }

  // Process a command from the game
  processCommand(command, gameState = null) {
    // Update bot state based on command
    if (command === 'MOVE_UP') {
      this.position.y -= 1;
    } else if (command === 'MOVE_DOWN') {
      this.position.y += 1;
    } else if (command === 'MOVE_LEFT') {
      this.position.x -= 1;
    } else if (command === 'MOVE_RIGHT') {
      this.position.x += 1;
    } else if (command === 'COLLECT_POINT') {
      this.score += 1;
    } else if (command === 'COLLECT_MEGA_POINT') {
      this.score += 20;
    }

    return {
      position: this.position,
      score: this.score,
      lastAction: this.lastAction,
      message: `Processed command: ${command}`
    };
  }

  // Get current bot state
  getState() {
    return {
      position: this.position,
      score: this.score,
      lastAction: this.lastAction
    };
  }
}

module.exports = BotLogic; 