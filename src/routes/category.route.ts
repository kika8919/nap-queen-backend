import express from "express";
import { CategoryController } from "../controller";
import { validate } from "../middlewares/validate";
import { CategoryValidation } from "../validations";

export const router = express.Router();

router.get("/", CategoryController.getAllCategories);
router.get(
  "/:id",
  validate(CategoryValidation.getCategoryById),
  CategoryController.getCategoryById
);
router.post(
  "/",
  validate(CategoryValidation.createCategory),
  CategoryController.createCategory
);
router.put(
  "/:id",
  validate(CategoryValidation.updateCategory),
  CategoryController.updateCategory
);
router.delete(
  "/:id",
  validate(CategoryValidation.deleteCategory),
  CategoryController.deleteCategory
);
