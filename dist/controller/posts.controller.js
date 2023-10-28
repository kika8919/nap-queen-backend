"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestPosts = exports.deletePosts = exports.updatePosts = exports.createPosts = exports.getPostsById = exports.getAllPosts = void 0;
const tslib_1 = require("tslib");
const models_1 = require("../models");
const getAllPosts = (_req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPosts = yield models_1.Posts.find();
        res.json(allPosts.map((post) => post.toUniformJSON()));
    }
    catch (err) {
        next(err);
    }
});
exports.getAllPosts = getAllPosts;
const getPostsById = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // populating category here for sending in response
        const post = yield models_1.Posts.findById(id).populate("category_id", "category", "Category");
        if (!post) {
            return res.json({ message: "post with input id not found" });
        }
        res.json(post.toCategoryJSON());
    }
    catch (err) {
        next(err);
    }
});
exports.getPostsById = getPostsById;
const createPosts = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_id } = req.body;
        const category = yield models_1.Categories.findById(category_id);
        if (!category) {
            return res.status(400).json({ error: "Invalid category_id" });
        }
        const newPost = new models_1.Posts(req.body);
        const result = yield models_1.Posts.create(newPost);
        res.json(result.toUniformJSON());
    }
    catch (err) {
        next(err);
    }
});
exports.createPosts = createPosts;
const updatePosts = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedPost = yield models_1.Posts.findByIdAndUpdate(id, {
            $set: { title, content },
        }, { new: true });
        if (!updatedPost) {
            res.json({ message: "post with input id not found" });
        }
        else {
            res.json(updatedPost.toUniformJSON());
        }
    }
    catch (err) {
        next(err);
    }
});
exports.updatePosts = updatePosts;
const deletePosts = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield models_1.Posts.findByIdAndDelete(id);
        if (response == null) {
            return res.json({ message: "post with input id not found" });
        }
        res.json({ message: "success" });
    }
    catch (err) {
        next(err);
    }
});
exports.deletePosts = deletePosts;
const getLatestPosts = (_req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestPosts = yield models_1.Posts.aggregate([
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
    }
    catch (err) {
        next(err);
    }
});
exports.getLatestPosts = getLatestPosts;
//# sourceMappingURL=posts.controller.js.map