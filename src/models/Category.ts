import mongoose from "mongoose";

interface ICategory {
  category: string;
}

interface ICategoryDocument extends ICategory, Document {
  toJson: () => ICategory;
}

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
CategorySchema.methods.toJson = function () {
  return {
    id: this._id,
    category: this.category,
  };
};

export const Categories = mongoose.model<ICategoryDocument>(
  "Category",
  CategorySchema
);
