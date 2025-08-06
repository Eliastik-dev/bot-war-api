const express = require('express');
const cors = require('cors');
const gameController = require('./controllers/gameController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/action', gameController.getAction);
app.post('/command', gameController.postCommand);
app.post('/keyboard', gameController.postKeyboard);
app.post('/reset', gameController.resetBot);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'BotWar API is running!' });
});

// Start server only if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 BotWar API server running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/health`);
    console.log(`🎮 Game endpoints:`);
    console.log(`   GET  /action - Get bot action`);
    console.log(`   POST /command - Send command to bot`);
  });
}

module.exports = app; 