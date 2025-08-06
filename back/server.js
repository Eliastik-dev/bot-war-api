const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use(cors());

// Serve static files from frontend
app.use(express.static(path.join(__dirname, '../front')));

// Bot state - stores the current move and action
let botState = {
  move: 'STAY',
  action: 'COLLECT'
};

// Function to update bot state
function updateBotState(move, action = 'COLLECT') {
  botState.move = move;
  botState.action = action;
  return botState;
}

// GET /action - returns the current bot action
app.get('/action', (req, res) => {
  res.json(botState);
});

// POST /action - receives move command and updates bot state
app.post('/action', (req, res) => {
  const { move, action } = req.body;
  
  // Validate move
  const validMoves = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'STAY'];
  if (move && validMoves.includes(move)) {
    updateBotState(move, action || 'COLLECT');
  }
  
  res.json(botState);
});

// Serve the controller page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
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