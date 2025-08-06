# BotWar API 🎮

A simple API for the BotWar game where bots move in a maze to collect points. This project is designed for learning Docker, Node.js, and API development.

## 🎯 Game Overview

- **Regular points** = 1 point
- **Mega points** = 20 points
- Points are collected automatically when the bot moves over them
- The bot can be controlled with keyboard arrows

## 🚀 Features

- **GET /action** - Get the next action for the bot
- **POST /command** - Send commands to the bot
- **GET /health** - Health check endpoint
- Unit tests with Jest
- Docker containerization
- GitHub Actions for deployment

## 🏗️ Project Structure

```
bot-war-api/
├── src/
│   ├── controllers/
│   │   ├── gameController.js
│   │   └── __tests__/
│   │       └── gameController.test.js
│   ├── services/
│   │   ├── botLogic.js
│   │   └── __tests__/
│   │       └── botLogic.test.js
│   └── index.js
├── Dockerfile
├── package.json
├── jest.config.js
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18 or higher
- Docker (optional, for containerization)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bot-war-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

4. **Run in development mode (with auto-reload)**
   ```bash
   npm run dev
   ```

5. **Run tests**
   ```bash
   npm test
   ```

### Docker

1. **Build the Docker image**
   ```bash
   docker build -t bot-war-api .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 bot-war-api
   ```

## 📡 API Endpoints

### GET /action
Get the next action for the bot.

**Response:**
```json
{
  "move": "UP",
  "action": "COLLECT"
}
```

### POST /command
Send a command to the bot.

**Request:**
```json
{
  "command": "MOVE_UP",
  "gameState": {
    "position": { "x": 1, "y": 1 }
  }
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "position": { "x": 1, "y": 0 },
    "score": 0,
    "lastAction": "UP",
    "message": "Processed command: MOVE_UP"
  },
  "timestamp": "2024-01-01T12:00:00.000Z",
  "message": "Command processed: MOVE_UP"
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "BotWar API is running!"
}
```

## 🎮 Bot Actions

### Move Actions
- `UP` - Move bot up
- `DOWN` - Move bot down
- `LEFT` - Move bot left
- `RIGHT` - Move bot right
- `STAY` - Bot stays in place

### Action Actions
- `COLLECT` - Collect items
- `NONE` - Do nothing
- `ATTACK` - Attack action

## 🧪 Testing

The project includes comprehensive unit tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### GitHub Actions
The project includes GitHub Actions for automatic deployment to Railway.

1. Fork this repository
2. Connect your Railway account
3. Push changes to trigger deployment

### Manual Deployment
You can deploy to any platform that supports Docker:

1. Build the Docker image
2. Push to your container registry
3. Deploy to your preferred platform

## 📚 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [Docker Tutorial](https://docs.docker.com/get-started/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

Happy coding! 🎉 