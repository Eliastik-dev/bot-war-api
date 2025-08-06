class BotLogic {
  constructor() {
    // Bot's current position (simplified)
    this.position = { x: 0, y: 0 };
    this.score = 0;
    this.lastAction = 'STAY';
    this.lastMoveAction = 'STAY';
    this.lastGameAction = 'NONE';
    this.currentMoveAction = 'STAY'; // Current move action from keyboard
    this.currentGameAction = 'NONE'; // Current game action
    
    // Available actions
    this.moveActions = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY'];
    this.actionActions = ['COLLECT', 'NONE', 'ATTACK'];
  }

  // Get the current move action (from keyboard input)
  getCurrentMoveAction() {
    return this.currentMoveAction;
  }

  // Get the current game action
  getCurrentGameAction() {
    return this.currentGameAction;
  }

  // Get the next move action for the bot (random - for testing)
  getNextMoveAction() {
    // Pick a random move action
    const moveAction = this.moveActions[Math.floor(Math.random() * this.moveActions.length)];
    this.lastMoveAction = moveAction;
    return moveAction;
  }

  // Get the next game action for the bot (random - for testing)
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

  // Process keyboard input (arrow keys)
  processKeyboardInput(key) {
    // Map keyboard keys to move actions
    const keyMap = {
      'ArrowUp': 'UP',
      'ArrowDown': 'DOWN',
      'ArrowLeft': 'LEFT',
      'ArrowRight': 'RIGHT',
      ' ': 'STAY', // Spacebar for stay
      'c': 'COLLECT',
      'a': 'ATTACK',
      'n': 'NONE'
    };

    const moveAction = keyMap[key];
    if (moveAction) {
      if (this.moveActions.includes(moveAction)) {
        // It's a move action - update position immediately
        this.currentMoveAction = moveAction;
        this.lastMoveAction = moveAction;
        this.lastAction = moveAction;
        
        // Update position based on move action
        if (moveAction === 'UP') {
          this.position.y -= 1;
        } else if (moveAction === 'DOWN') {
          this.position.y += 1;
        } else if (moveAction === 'LEFT') {
          this.position.x -= 1;
        } else if (moveAction === 'RIGHT') {
          this.position.x += 1;
        }
        // STAY doesn't change position
      } else if (this.actionActions.includes(moveAction)) {
        // It's a game action
        this.currentGameAction = moveAction;
        this.lastGameAction = moveAction;
        this.lastAction = moveAction;
      }
    }

    return {
      position: this.position,
      score: this.score,
      currentMoveAction: this.currentMoveAction,
      currentGameAction: this.currentGameAction,
      message: `Keyboard input processed: ${key} -> ${moveAction || 'unknown'}`
    };
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