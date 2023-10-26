import express from "express";

export const validateAPIKey = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void | express.Response => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  next();
};
