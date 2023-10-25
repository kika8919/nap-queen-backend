"use strict";
import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import corsOptions from "./config/corsOption";
import mongoose from "mongoose";
import connectDB from "./config/db.connect";

dotenv.config();
const app = express();
connectDB();

const PORT = (process.env.PORT || 3000) as number;

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/health", (_req, res) => {
  res.json({
    uptime: process.uptime(),
    status: "UP",
    timestamp: new Date(),
  });
});

// Not found error handler
app.use(
  (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    const error = new Error("not found") as any;
    error.status = 404;
    next(error);
  }
);

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.json({ errors: { message: err.message, err } });
  }
);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

export { app };
