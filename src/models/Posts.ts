import mongoose from "mongoose";

interface IPosts {
  title: string;
  content: string;
  category_id: mongoose.Schema.Types.ObjectId;
}

interface IPostsDocument extends IPosts, Document {}

const PostsSchema = new mongoose.Schema<IPostsDocument>(
  {
    title: String,
    content: String,
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export const Posts = mongoose.model<IPostsDocument>("Post", PostsSchema);
