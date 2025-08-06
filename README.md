# BotWar Bot

A simple bot for the BotWar game that collects points in a randomly generated maze.

## Game Rules

- The bot must collect normal points (1 pt) and mega points (20 pts)
- The maze and points are randomly generated
- The bot collects points automatically when moving over them
- The bot can move using: UP, DOWN, LEFT, RIGHT, STAY

## Bot API

- `GET /action`: Returns the bot's next action
- `POST /action`: Receives game data and returns bot action
- `GET /health`: Health check endpoint

## Project Structure

```
bot-war-api/
├── back/
│   ├── server.js          # Main bot server
│   └── server.test.js     # Tests for the bot
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

This is a simple bot that:
- Moves randomly in any direction
- Always tries to collect points
- Doesn't use game state (basic implementation)

You can improve the bot by:
- Adding pathfinding algorithms
- Using the game state to make smarter decisions
- Implementing different strategies for different situations 