import mongoose from "mongoose";
import { CategorySchema } from "./Category";

interface IPosts {
  title: string;
  content: string;
  category_id: any;
}

interface IPostsDocument extends IPosts, Document {}

const PostsSchema = new mongoose.Schema<IPostsDocument>(
  {
    title: String,
    content: String,
    category_id: { type: CategorySchema },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model<IPostsDocument>("Post", PostsSchema);
