import express from "express";
const router = express.Router();
import { router as PostsRouter } from "./posts.route";

router.use("/posts", PostsRouter);

export default router;
