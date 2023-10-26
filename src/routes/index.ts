import express from "express";
const router = express.Router();
import { router as PostsRouter } from "./posts.route";
import { router as CategoryRouter } from "./category.route";

router.use("/posts", PostsRouter);
router.use("/category", CategoryRouter);

export default router;
