import express from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import corsOptions from "./corsOption";
import mongoose from "mongoose";
import connectDB from "./db.connect";
import router from "../routes";

dotenv.config();

export const HOST = process.env.HOST || "localhost";
/* istanbul ignore next */
export const PORT = process.env.PORT || "3000";

export const createServer = (): express.Application => {
  const app = express();
  connectDB();

  app.use(cors(corsOptions));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api", router);
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
  });

  return app;
};
