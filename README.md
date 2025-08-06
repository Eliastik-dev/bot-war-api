# BotWar Bot

A keyboard-controlled bot for the BotWar game that collects points in a randomly generated maze.

## Game Rules

- The bot must collect normal points (1 pt) and mega points (20 pts)
- The maze and points are randomly generated
- The bot collects points automatically when moving over them
- The bot moves only when you press arrow keys on your keyboard

## Bot API

- `GET /action`: Returns the current bot action
- `POST /action`: Receives move command and updates bot state
- `GET /`: Serves the keyboard controller interface

## Project Structure

```
bot-war-api/
├── back/
│   ├── server.js          # Main bot server
│   └── server.test.js     # Tests for the bot
├── front/
│   └── index.html         # Keyboard controller interface
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions deployment
├── Dockerfile             # Docker configuration
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the bot locally:
   ```bash
   npm start
   ```

3. Run tests:
   ```bash
   npm test
   ```

## Docker

Build and run with Docker:

```bash
docker build -t botwar-bot .
docker run -p 3000:3000 botwar-bot
```

## Deployment

The bot is automatically deployed to Railway when you push to the main branch.

To deploy manually:

1. Get a Railway token from https://railway.app/account/tokens
2. Add it as a GitHub secret named `RAILWAY_TOKEN`
3. Push to main branch

## Bot Logic

This is a keyboard-controlled bot that:
- Moves only when you press arrow keys
- Always tries to collect points
- Has a simple web interface for control
- Stores the current move state

## How to Control the Bot

1. **Open the controller**: Visit your bot's URL (e.g., `https://your-bot.railway.app`)
2. **Use arrow keys** or **click buttons** to control movement
3. **The bot will move** in the direction you choose
4. **Action is automatically** set to "COLLECT" to gather points

## Controls
- **↑** (Arrow Up): Move UP
- **↓** (Arrow Down): Move DOWN  
- **←** (Arrow Left): Move LEFT
- **→** (Arrow Right): Move RIGHT
- **Spacebar**: STAY in place 