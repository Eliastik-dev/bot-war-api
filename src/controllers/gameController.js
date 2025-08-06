const BotLogic = require('../services/botLogic');

// Simple bot instance
const bot = new BotLogic();

// GET /action - Get the next action for the bot
const getAction = (req, res) => {
  try {
    // Get the next action from bot logic
    const action = bot.getNextAction();
    
    res.json({
      success: true,
      action: action,
      timestamp: new Date().toISOString(),
      message: `Bot decided to: ${action}`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
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

module.exports = {
  getAction,
  postCommand
}; 