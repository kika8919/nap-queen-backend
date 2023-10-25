import mongoose from "mongoose";

interface ICategory {
  category: string;
}
interface ICategoryDocument extends ICategory, Document {}

export const CategorySchema = new mongoose.Schema<ICategoryDocument>(
  {
    category: String,
  },
  { timestamps: true }
);

export const Categories = mongoose.model<ICategoryDocument>(
  "Category",
  CategorySchema
);
