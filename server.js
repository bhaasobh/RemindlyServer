const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const authRoutes = require("./routers/authRoutes");
const setupWebSocket = require("./websocket");
const locationRouter = require("./routers/locationRoutes");
const reminderLocaionRouter = require("./routers/reminderLocaionRoutes");
const reminderTimeRouter = require("./routers/reminderTimeRoutes");
const personalItemRouter = require("./routers/personalItemsRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Routes
app.get("/auth", async (req, res) => {
  const user = { id: 1 };
  const token = jwt.sign(user, process.env.SECRET_KEY);
  res.json({ token });
});

app.use("/api/auth", authRoutes);
app.use("/api/locations", locationRouter);
app.use("/api/reminderLocation", reminderLocaionRouter);
app.use("/api/reminderTime", reminderTimeRouter);
app.use("/api/personalItems", personalItemRouter);

// Create HTTP server and integrate WebSocket
const server = http.createServer(app);
setupWebSocket(server); // Initialize WebSocket functionality

// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
