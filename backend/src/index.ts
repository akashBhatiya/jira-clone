import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorHandler";
import router from "./routes/index";
import { testConnection } from "./config/database";
import { syncDatabase } from "./models/POSTGRESQL";
import { Server } from "socket.io";
import SocketService from "./services/socket.service";
import SocketEventHandler from "./utils/socketEventHandler";

const CORS_ORIGINS: string[] = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:3000"];

const port = process.env.PORT || 5000;

const app: Express = express();

// socket server setup
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "development" ? "*" : CORS_ORIGINS,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
SocketService.setIO(io);
const socketEventHandler = SocketEventHandler.getInstance(io);
socketEventHandler.initializeEvents();

// Middleware
app.use(
  cors({
    origin: process.env.NODE_ENV === "development" ? "*" : CORS_ORIGINS,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server is running");
});

app.use(errorHandler);

// Database connection and sync
const initializeDatabase = async () => {
  await testConnection();
  //   const forceSync = process.env.NODE_ENV === 'development' && process.env.DB_FORCE_SYNC === 'true';
  // await syncDatabase(forceSync);
};

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase();

    // Start the server
    httpServer.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
