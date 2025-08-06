const BotLogic = require('../services/botLogic');

// Simple bot instance
const bot = new BotLogic();

// GET /action - Get the next action for the bot
const getAction = (req, res) => {
  try {
    // Get the current action from bot logic (based on last keyboard input)
    const moveAction = bot.getCurrentMoveAction();
    const gameAction = bot.getCurrentGameAction();
    
    res.json({
      move: moveAction,
      action: gameAction
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get bot action',
      message: error.message
    });
  }
};

// POST /command - Receive commands or game state
const postCommand = (req, res) => {
  try {
    const { command, gameState } = req.body;
    
    // Check if command is provided
    if (!command) {
      return res.status(400).json({
        success: false,
        error: 'Command is required',
        message: 'Please provide a command in the request body'
      });
    }
    
    // Process the command
    const result = bot.processCommand(command, gameState);
    
    res.json({
      success: true,
      result: result,
      timestamp: new Date().toISOString(),
      message: `Command processed: ${command}`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to process command',
      message: error.message
    });
  }
};

// POST /keyboard - Handle keyboard input (arrow keys)
const postKeyboard = (req, res) => {
  try {
    const { key } = req.body;
    
    // Check if key is provided
    if (!key) {
      return res.status(400).json({
        success: false,
        error: 'Key is required',
        message: 'Please provide a key in the request body'
      });
    }
    
    // Process the keyboard input
    const result = bot.processKeyboardInput(key);
    
    res.json({
      success: true,
      result: result,
      timestamp: new Date().toISOString(),
      message: `Keyboard input processed: ${key}`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Failed to process keyboard input',
      message: error.message
    });
  }
};

module.exports = {
  getAction,
  postCommand,
  postKeyboard
}; 