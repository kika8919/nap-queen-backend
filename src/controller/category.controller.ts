import express from "express";
import { Categories } from "../models";

export const getAllCategories = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const allCategories = await Categories.find();
    res.json(allCategories.map((category) => category.toJson()));
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const cat = Categories.findById(id);
    if (!cat) {
      res.json({ message: "input id not found" });
    } else {
      res.json(cat);
    }
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { category } = req.body;
    const newCategory = new Categories({ category });
    const result = await Categories.create(newCategory);
    res.json(result.toJson());
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const updatedCategory = await Categories.findByIdAndUpdate(
      id,
      {
        $set: { category },
      },
      { new: true }
    );
    if (!updateCategory) {
      res.json({ message: "invalid categoryId" });
    } else {
      res.json(updatedCategory.toJson());
    }
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCategory = await Categories.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.json({ message: "invalid categoryId" });
    } else {
      res.json({ message: "success" });
    }
  } catch (err) {
    next(err);
  }
};
