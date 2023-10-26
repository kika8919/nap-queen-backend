import express from "express";
import { Categories } from "../models";

export const getAllCategories = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const allCategories = await Categories.find();
    res.json(allCategories);
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
    res.json(result);
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
    res.json(updatedCategory);
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
    await Categories.findByIdAndDelete(id);
    res.json({ status: "delete successful" });
  } catch (err) {
    next(err);
  }
};
