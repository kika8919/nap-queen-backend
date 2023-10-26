"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Posts = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const PostsSchema = new mongoose_1.default.Schema({
    title: String,
    content: String,
    category_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
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
exports.Posts = mongoose_1.default.model("Post", PostsSchema);
//# sourceMappingURL=Posts.js.map