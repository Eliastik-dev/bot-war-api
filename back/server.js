const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../front")));

let botState = { move: "STAY", action: "COLLECT" };

app.get("/action", (req, res) => {
  res.json(botState);
});

app.post("/action", (req, res) => {
  const { move, action } = req.body;
  const validMoves = ["UP", "DOWN", "LEFT", "RIGHT", "STAY"];

  if (move && validMoves.includes(move)) {
    botState.move = move;
    botState.action = action || "COLLECT";
  }

  res.json(botState);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/index.html"));
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`BotWar bot running on port ${port}`);
  });
}

module.exports = app;
