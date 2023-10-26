import mongoose from "mongoose";

interface ICategory {
  category: string;
}

interface ICategoryDocument extends ICategory, Document {}

export const CategorySchema = new mongoose.Schema<ICategoryDocument>(
  {
    category: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export const Categories = mongoose.model<ICategoryDocument>(
  "Category",
  CategorySchema
);
