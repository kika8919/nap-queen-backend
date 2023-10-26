import mongoose from "mongoose";

interface IPosts {
  title: string;
  content: string;
  category_id: mongoose.Schema.Types.ObjectId;
}

interface IPostsDocument extends IPosts, Document {
  toUniformJSON: () => IPosts;
  toCategoryJSON: () => IPosts;
}

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
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

PostsSchema.methods.toUniformJSON = function () {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    category_id: this.category_id,
    created_at: this.created_at,
    updated_at: this.updated_at,
  };
};

PostsSchema.methods.toCategoryJSON = function () {
  return {
    id: this._id,
    title: this.title,
    content: this.content,
    category_id: this.category_id._id,
    category: this.category_id.category,
    created_at: this.created_at,
    updated_at: this.updated_at,
  };
};

export const Posts = mongoose.model<IPostsDocument>("Post", PostsSchema);
