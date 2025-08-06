const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use(cors());

// Simple bot logic - just moves randomly
function getBotAction() {
  const moves = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY'];
  const randomMove = moves[Math.floor(Math.random() * moves.length)];
  
  return {
    move: randomMove,
    action: 'COLLECT'
  };
}

// GET /action - returns the bot's next action
app.get('/action', (req, res) => {
  const action = getBotAction();
  res.json(action);
});

// POST /action - receives game data and returns bot action
app.post('/action', (req, res) => {
  // For now, we ignore the game data and just return a random action
  // This is a simple bot that doesn't use game state
  const action = getBotAction();
  res.json(action);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bot is running' });
});

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(port, () => {
    console.log(`BotWar bot running on port ${port}`);
  });
}

module.exports = app; 