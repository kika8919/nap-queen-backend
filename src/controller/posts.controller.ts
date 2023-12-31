import express from "express";
import { Categories, Posts } from "../models";

export const getAllPosts = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const allPosts = await Posts.find();
    res.json(allPosts.map((post) => post.toUniformJSON()));
  } catch (err) {
    next(err);
  }
};

export const getPostsById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void | express.Response<any>> => {
  try {
    const { id } = req.params;

    // populating category here for sending in response
    const post = await Posts.findById(id).populate(
      "category_id",
      "category",
      "Category"
    );
    if (!post) {
      return res.json({ message: "post with input id not found" });
    }
    res.json(post.toCategoryJSON());
  } catch (err) {
    next(err);
  }
};

export const createPosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void | express.Response<any>> => {
  try {
    const { category_id } = req.body;
    const category = await Categories.findById(category_id);
    if (!category) {
      return res.status(400).json({ error: "Invalid category_id" });
    }
    const newPost = new Posts(req.body);
    const result = await Posts.create(newPost);
    res.json(result.toUniformJSON());
  } catch (err) {
    next(err);
  }
};

export const updatePosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await Posts.findByIdAndUpdate(
      id,
      {
        $set: { title, content },
      },
      { new: true }
    );
    if (!updatedPost) {
      res.json({ message: "post with input id not found" });
    } else {
      res.json(updatedPost.toUniformJSON());
    }
  } catch (err) {
    next(err);
  }
};

export const deletePosts = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void | express.Response<any>> => {
  try {
    const { id } = req.params;
    const response = await Posts.findByIdAndDelete(id);
    if (response == null) {
      return res.json({ message: "post with input id not found" });
    }
    res.json({ message: "success" });
  } catch (err) {
    next(err);
  }
};

export const getLatestPosts = async (
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const latestPosts = await Posts.aggregate([
      { $sort: { created_at: -1 } },
      {
        $group: {
          _id: "$category_id",
          latestPost: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      {
        $project: {
          _id: 0,
          id: "$latestPost._id",
          title: "$latestPost.title",
          content: "$latestPost.content",
          created_at: "$latestPost.created_at",
          updated_at: "$latestPost.updated_at",
          category: { $arrayElemAt: ["$categoryData.category", 0] },
        },
      },
    ]);
    res.json(latestPosts);
  } catch (err) {
    next(err);
  }
};
