import express from "express";
import {
  getAllPosts,
  getPostsById,
  getLatestPosts,
  createPosts,
  updatePosts,
  deletePosts,
} from "../controller/posts.controller";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostsById);
router.post("/posts", createPosts);
router.put("/posts/:id", updatePosts);
router.delete("/posts/:id", deletePosts);
router.get("/posts/latest", getLatestPosts);

export { router };
