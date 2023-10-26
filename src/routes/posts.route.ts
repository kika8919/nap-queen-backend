import express from "express";
import { PostsController } from "../controller";
import { PostsValidation } from "../validations";
import { validate } from "../middlewares/validate";

export const router = express.Router();

router.get("/", PostsController.getAllPosts);
router.get("/latest", PostsController.getLatestPosts);
router.get(
  "/:id",
  validate(PostsValidation.getPostsById),
  PostsController.getPostsById
);
router.post(
  "/",
  validate(PostsValidation.createPosts),
  PostsController.createPosts
);
router.put(
  "/:id",
  validate(PostsValidation.updatePosts),
  PostsController.updatePosts
);
router.delete(
  "/:id",
  validate(PostsValidation.deletePosts),
  PostsController.deletePosts
);
